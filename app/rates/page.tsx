import Component from "../../hero-section"

export default async function RatesPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>
}) {
  const params = await searchParams
  const initialType = params.type === "refinance" ? "refinance" : "purchase"

  return <Component initialMortgageType={initialType} />
}
