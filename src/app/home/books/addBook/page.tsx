import BookForm from "@/components/admin/books/bookForm";

export default async function AddBook() {
  return (
    <>
      <div className="space-y-4 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-orange-800">Add New Book</h2>
        <BookForm />
      </div> 
    </>
  );
}
