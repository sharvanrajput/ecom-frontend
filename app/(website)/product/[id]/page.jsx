import ProductDetails from "@/components/ProductDetails";

export function generateStaticParams() {
  return [{ id: "__product_placeholder__" }];
}

export default async function ProductDetailsPage({ params }) {
  const { id } = await params;

  return <ProductDetails key={id} productId={id} />;
}
