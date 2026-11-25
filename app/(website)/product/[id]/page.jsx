import ProductDetails from "@/components/ProductDetails";
import { dummyproducts } from "@/public/frontend_assets/assets";

export function generateStaticParams() {
  return dummyproducts.map((product) => ({ id: product._id }));
}

export default async function ProductDetailsPage({ params }) {
  const { id } = await params;

  return <ProductDetails key={id} productId={id} />;
}
