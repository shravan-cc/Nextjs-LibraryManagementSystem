"use client";

import * as Select from "@radix-ui/react-select";
import { useTransition } from "react";
import { setUserLocale } from "@/services/locale";
import { Locale } from "@/i18n/config";
import { CheckIcon, ChevronDownIcon, GlobeIcon } from "lucide-react";

type Props = {
  defaultValue: string;
  items: Array<{ value: string; label: string }>;
  label: string;
};

export default function LocaleSwitcherSelect({
  defaultValue,
  items,
  label,
}: Props) {
  const [isPending, startTransition] = useTransition();

  function onChange(value: string) {
    const locale = value as Locale;
    startTransition(() => {
      setUserLocale(locale);
    });
  }

  return (
    <div className="relative">
      <Select.Root defaultValue={defaultValue} onValueChange={onChange}>
        <Select.Trigger
          aria-label={label}
          className={`
            flex items-center justify-between rounded-md border border-orange-200 bg-white px-3 py-2 text-sm
            shadow-sm transition-all duration-200 ease-in-out
            hover:bg-orange-50 hover:border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500
            ${isPending ? "pointer-events-none opacity-60" : ""}
          `}
        >
          <div className="flex items-center">
            <GlobeIcon className="mr-2 h-4 w-4 text-orange-500" />
            <Select.Value />
          </div>
          <Select.Icon>
            <ChevronDownIcon className="h-4 w-4 text-orange-500" />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            align="end"
            className="overflow-hidden rounded-md border border-orange-200 bg-white shadow-lg"
            position="popper"
          >
            <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-orange-500 cursor-default">
              <ChevronDownIcon className="h-4 w-4 rotate-180" />
            </Select.ScrollUpButton>
            <Select.Viewport className="p-1">
              {items.map((item) => (
                <Select.Item
                  key={item.value}
                  value={item.value}
                  className="relative flex items-center px-8 py-2 text-sm text-gray-700 rounded-sm select-none hover:bg-orange-100 focus:bg-orange-100 focus:outline-none"
                >
                  <Select.ItemText>{item.label}</Select.ItemText>
                  <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                    <CheckIcon className="h-4 w-4 text-orange-500" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
            <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-orange-500 cursor-default">
              <ChevronDownIcon className="h-4 w-4" />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}
