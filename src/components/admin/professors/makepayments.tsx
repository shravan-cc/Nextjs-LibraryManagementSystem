"use client";

import { Button } from "@/components/ui/button";
import { performPayment } from "@/lib/action";
import { RazorpayProps } from "@/lib/definition";
import { CheckCircle, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Razorpay({
  professor,
  memberName,
  memberEmail,
  memberPhoneNumber,
}: RazorpayProps) {
  const router = useRouter();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise<void>((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => {
          resolve();
        };
        document.body.appendChild(script);
      });
    };

    loadRazorpayScript();
  }, []);

  const handlePayment = async () => {
    setIsConfirmOpen(false);
    const orderRes = await performPayment(500);
    const orderId = orderRes?.orderId;

    if (!orderId) {
      console.log("No orderId");
      alert("no order");
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: 500 * 100,
      currency: "INR",
      name: "Library Management System",
      description: "Library Fee Payment",
      order_id: orderId,
      handler: function (response: any) {
        if (response.razorpay_payment_id) {
          setIsSuccessOpen(true);
        } else {
          setIsSuccessOpen(false);
          setIsConfirmOpen(true);
        }
      },
      prefill: {
        name: memberName,
        email: memberEmail,
        contact: memberPhoneNumber,
      },
      theme: {
        color: "#f97316",
      },
    };

    const razorpay = new (window as any).Razorpay(options);
    razorpay.open();
  };

  const handleBookAppointment = () => {
    setIsSuccessOpen(false);
    router.push(
      `/user/professors/${professor.id}?name=${encodeURIComponent(
        memberName
      )}&email=${encodeURIComponent(memberEmail!)}`
    );
  };

  return (
    <>
      <Button
        className="w-full bg-orange-500 hover:bg-orange-600 text-white"
        onClick={() => setIsConfirmOpen(true)}
      >
        Book Appointment
        <ChevronRight className="ml-2 h-4 w-4" />
      </Button>

      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-orange-800">
              Confirm Appointment Booking
            </DialogTitle>
            <DialogDescription className="text-orange-600">
              Youre about to book an appointment with Professor {professor.name}
              .
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium text-orange-700">Name:</span>
              <span className="col-span-3">{memberName}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium text-orange-700">Amount:</span>
              <span className="col-span-3">₹500</span>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsConfirmOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="bg-orange-500 hover:bg-orange-600"
              onClick={handlePayment}
            >
              Proceed to Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <CheckCircle className="w-16 h-16 text-green-500" />
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-green-600">
                Payment Successful!
              </DialogTitle>
              <DialogDescription className="text-lg text-orange-600">
                Your payment has been processed successfully.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="text-orange-700">
                You can now book your appointment with Professor{" "}
                {professor.name}.
              </p>
            </div>
            <DialogFooter className="w-full">
              <Button
                type="button"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 text-lg"
                onClick={handleBookAppointment}
              >
                Book Appointment
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
