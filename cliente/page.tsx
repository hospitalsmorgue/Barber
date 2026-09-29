import { CustomerArea } from "@/components/customer-area";
import { CustomerCheckIns } from "@/components/customer-checkins";
export const metadata = { title: "Minha área" };
export default function CustomerPage() { return <><CustomerArea /><CustomerCheckIns /></>; }
