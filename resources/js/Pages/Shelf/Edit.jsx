import { useForm } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthedLayout";

export default function Edit({ auth, shelf }) {
  const { data, setData, put, processing, errors, reset } = useForm({
    name: shelf.name,
    product_id: shelf.product.id,
    user_id: shelf.user.id,
  });

  const submit = (e) => {
    e.preventDefault();

    put(route("shelf.update", shelf.id));
  };
  return (
    <>
      <Authenticated>
        <section className="flex items-center justify-center w-screen h-screen">
          <form
            onSubmit={submit}
            className="grid w-full p-8 bg-white rounded-md place-items-center"
            encType="multipart/form-data"
          >
            <fieldset
              disabled={processing}
              className="grid gap-4 w-[400px]"
            >
              <legend className="w-full text-2xl text-center">
                Edit Shelf
              </legend>
              <label htmlFor="name" className="flex flex-col">
                <span className="font-bold">Name</span>
                <input
                  className="placeholder-gray-500 rounded shadow "
                  type="text"
                  placeholder="name"
                  name="name"
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                />
                {errors.name && <p className="text-red-500">{errors.name}</p>}
              </label>
              <label htmlFor="product_id" className="flex flex-col">
                <span className="font-bold">Product</span>
                <select
                  className="placeholder-gray-500 rounded shadow "
                  name="product_id"
                  onChange={(e) => setData("product_id", e.target.value)}
                >
                  <option value="0">Select Product</option>
                    <option key={shelf.product.id} value={shelf.product.id}>
                      {shelf.product.name}
                    </option>
                </select>
                {errors.product_id && (
                  <p className="text-red-500">{errors.product_id}</p>
                )}
              </label>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-black rounded"
                onClick={submit}
              >
                Update
              </button>
            </fieldset>
          </form>
        </section>
      </Authenticated>
    </>
  );
}

