"use client";

interface IndustriesSectionProps {
  onSelectIndustry: (industry: string) => void;
}

const industries = ["Hotels & Resorts", "Restaurants & Catering", "Salons & Spas", "Healthcare & Institutions"];

export default function IndustriesSection({ onSelectIndustry }: IndustriesSectionProps) {
  return (
    <section id="industries" className="bg-[#faf8f5] px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-[1200px]">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#6825a3]">Industries we serve</p>
        <h2 className="mb-8 font-serif text-4xl text-[#191024]">Care built around your operation</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry) => (
            <button
              key={industry}
              type="button"
              onClick={() => onSelectIndustry(industry)}
              className="border border-[#e4ded5] bg-white p-6 text-left transition hover:-translate-y-1 hover:shadow-md"
            >
              <span className="font-semibold text-[#240a3e]">{industry}</span>
              <span className="mt-3 block text-sm text-[#554a61]">Explore a tailored commercial laundry plan.</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
