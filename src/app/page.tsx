import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { getAllMedicalCenters } from "@/lib/medical-centers";
import WhatsAppIcon from "@/components/common/WhatsAppIcon";
import {
  ShieldCheck,
  MessageCircle,
  Building2,
  Globe,
  Clock,
  ArrowRight,
  HelpCircle,
  CheckCircle2,
  MapPin,
} from "lucide-react";

export default function HomePage() {
  const topCenters = getAllMedicalCenters().slice(0, 6);

  const howItWorksSteps = [
    {
      step: "01",
      title: "Submit Candidate Details",
      desc: "Fill in candidate passport, visa, and preferred examination city information accurately on our secure portal.",
    },
    {
      step: "02",
      title: "Account Verification",
      desc: "Review token request details and complete account/payment verification instructions.",
    },
    {
      step: "03",
      title: "Upload Payment Screenshot",
      desc: "Attach a clear payment receipt screenshot to confirm your token assistance request.",
    },
    {
      step: "04",
      title: "Receive Medical Token",
      desc: "Our concierge team processes your token request and delivers updates directly to your WhatsApp.",
    },
  ];

  const whyChooseUs = [
    {
      icon: Clock,
      title: "Fast & Priority Handling",
      desc: "Instant processing assistance to ensure you get your medical token without delays or errors.",
    },
    {
      icon: ShieldCheck,
      title: "Wafid Aligned & Reliable",
      desc: "Full adherence to official Wafid and GCC health council examination rules in Pakistan.",
    },
    {
      icon: MessageCircle,
      title: "Direct WhatsApp Support",
      desc: "Dedicated Pakistani support agents available to guide you through every step of the process.",
    },
    {
      icon: Globe,
      title: "All GCC Destinations",
      desc: "Assistance for Saudi Arabia, UAE, Qatar, Kuwait, Bahrain, Oman, and Yemen visas.",
    },
  ];

  const faqList = [
    {
      q: "What is Wafid?",
      a: "Wafid (formerly known as GAMCA) is the official platform authorized by the Gulf Health Council to issue medical appointment tokens for candidates traveling to GCC countries for employment or residence.",
    },
    {
      q: "What was GAMCA?",
      a: "GAMCA stands for Gulf Approved Medical Centers Association. It has now been rebranded and digitized globally as the Wafid platform.",
    },
    {
      q: "How do I get a medical token?",
      a: "Simply click 'Get Medical Token' on Gamca Centre, fill out Step 1 with your passport details, complete Step 2 account verification with a screenshot upload, and our team handles the token processing.",
    },
    {
      q: "Which countries are supported?",
      a: "We support medical token processing for all GCC member states: Saudi Arabia (KSA), United Arab Emirates (UAE), Qatar, Kuwait, Bahrain, Oman, and Yemen.",
    },
    {
      q: "Can I choose a specific medical center?",
      a: "No. Under official Wafid rules, candidates select their examination city, and the Wafid system automatically generates and assigns the medical center.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-20">
      
      {/* 1. HOMEPAGE HERO SECTION */}
      <section className="relative bg-gradient-to-b from-[#FAF9F6] via-white to-[#F3F4F6] text-[#061224] pt-16 pb-24 border-b border-slate-200 overflow-hidden">
        {/* Subtle Background Glow Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full text-xs font-bold text-amber-800 uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                Pakistan Concierge Medical Token Portal
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#061224] leading-tight">
                Get Your <span className="gold-gradient-text">Wafid Medical Token</span> — Fast & Hassle-Free
              </h1>

              <p className="text-base sm:text-lg text-slate-700 max-w-2xl leading-relaxed mx-auto lg:mx-0 font-medium">
                Your trusted assistance for Wafid/GAMCA medical appointment token processing in Pakistan. Premium, reliable, and priority concierge support for all GCC candidates.
              </p>

              {/* Fee & Step Banner from User Spec */}
              <div className="pt-2 pb-1 space-y-4">
                <p className="text-xs sm:text-sm font-bold text-slate-800 max-w-2xl leading-relaxed">
                  Fill Your Form <span className="text-slate-400 font-normal">|</span> Pay Fee <span className="text-slate-400 font-normal">|</span> Get Your Appointment <span className="text-slate-400 font-normal">|</span> Check Medical Status and Report Online
                </p>

                <div>
                  <div className="inline-block bg-[#00C853] text-white px-6 py-2.5 rounded-lg text-lg sm:text-2xl font-extrabold tracking-wide shadow-lg shadow-[#00C853]/30">
                    Token Fee Rs: 4,500/-
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/book-medical-token"
                  className="gold-btn w-full sm:w-auto px-8 py-4 rounded-xl text-xs uppercase tracking-wider font-extrabold flex items-center justify-center gap-3 shadow-xl"
                >
                  <ShieldCheck className="w-5 h-5" />
                  <span>Get Medical Token</span>
                </Link>

                <a
                  href={siteConfig.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-3 transition-all shadow-lg shadow-[#25D366]/30"
                >
                  <WhatsAppIcon className="w-5 h-5 fill-current" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              {/* Trust Subtext */}
              <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-600 font-bold">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" /> Fast Assistance
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" /> All Pakistan Cities
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" /> Official Format Support
                </span>
              </div>

            </div>

            {/* Right Card / Logo Showcase Column */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md bg-white p-8 rounded-3xl border border-amber-500/30 shadow-2xl space-y-6">
                
                <div className="flex items-center justify-center">
                  <div className="relative w-28 h-28 bg-slate-50 rounded-2xl p-2 border-2 border-amber-400/50 shadow-md">
                    <Image
                      src={siteConfig.logo.src}
                      alt={siteConfig.logo.alt}
                      fill
                      className="object-contain p-1"
                      priority
                    />
                  </div>
                </div>

                <div className="text-center space-y-1">
                  <h3 className="text-xl font-extrabold text-[#061224] tracking-wide">{siteConfig.name}</h3>
                  <p className="text-xs text-amber-700 uppercase tracking-widest font-bold">{siteConfig.tagline}</p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500 font-medium">Token Fee:</span>
                    <span className="text-[#00C853] font-extrabold text-xs bg-emerald-100/80 px-2 py-0.5 rounded border border-emerald-300">Rs: 4,500/-</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500 font-medium">Coverage:</span>
                    <span className="text-amber-800 font-bold">All 14+ Pakistan Cities</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500 font-medium">Destinations:</span>
                    <span className="text-[#061224] font-bold">KSA, UAE, Qatar, Kuwait +</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Verification:</span>
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 2-Step Secure Flow
                    </span>
                  </div>
                </div>

                <Link
                  href="/book-medical-token"
                  className="block w-full py-3.5 bg-[#061224] hover:bg-amber-600 text-white hover:text-[#061224] text-center font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-colors"
                >
                  Start Token Application
                </Link>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. QUICK TRUST STRIP */}
      <section className="bg-white py-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            
            <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 shadow-sm">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#061224] font-mono block">100%</span>
              <span className="text-xs text-amber-900 font-bold uppercase tracking-wider">Wafid Compliant</span>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 shadow-sm">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#061224] font-mono block">14+</span>
              <span className="text-xs text-amber-900 font-bold uppercase tracking-wider">Pakistan Cities</span>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 shadow-sm">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#061224] font-mono block">7 GCC</span>
              <span className="text-xs text-amber-900 font-bold uppercase tracking-wider">Countries Supported</span>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 shadow-sm">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#061224] font-mono block">24/7</span>
              <span className="text-xs text-amber-900 font-bold uppercase tracking-wider">WhatsApp Support</span>
            </div>

          </div>
        </div>
      </section>

      {/* 3. GET MEDICAL TOKEN CTA STRIP */}
      <section className="py-12 bg-[#061224] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Ready to Get Your Wafid Medical Token?
            </h2>
            <p className="text-slate-300 text-sm mt-1">
              Apply online in minutes with candidate passport details and quick screenshot confirmation.
            </p>
          </div>
          <Link
            href="/book-medical-token"
            className="gold-btn px-8 py-4 rounded-xl text-xs uppercase tracking-wider font-extrabold flex items-center gap-2 whitespace-nowrap shadow-xl"
          >
            <ShieldCheck className="w-5 h-5" />
            Get Medical Token Now
          </Link>
        </div>
      </section>

      {/* 4. GCC COUNTRIES GRID */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="px-3 py-1 bg-amber-500/10 text-amber-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block">
              GCC Destination Hub
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#061224]">
              Supported GCC Countries
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Medical token appointment assistance for all Gulf Cooperation Council nations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {siteConfig.destinationCountries.map((country) => (
              <Link
                key={country.code}
                href={`/book-medical-token?country=${encodeURIComponent(country.name)}`}
                className="bg-[#FAF9F6] p-6 rounded-2xl border border-slate-200 hover:border-amber-500/50 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{country.flag}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-amber-500/10 text-amber-800 rounded-full">
                    {country.code}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#061224] group-hover:text-amber-600 transition-colors">
                    {country.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Wafid Medical Examination Token Support
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center text-xs font-bold text-amber-700 group-hover:gap-2 transition-all">
                  <span>Apply for {country.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* 5. HOW IT WORKS SECTION */}
      <section className="py-20 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-3 py-1 bg-amber-500/10 text-amber-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block">
              Simple 4-Step Flow
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#061224]">
              How It Works
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Our streamlined process gets your medical token application submitted effortlessly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorksSteps.map((item) => (
              <div
                key={item.step}
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 relative group hover:border-amber-500/40 transition-all"
              >
                <span className="text-4xl font-black text-amber-600/30 group-hover:text-amber-600/60 font-mono block mb-4">
                  {item.step}
                </span>
                <h3 className="text-base font-bold text-[#061224] mb-2">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. WHY GAMCA CENTRE */}
      <section className="py-20 bg-white text-[#061224] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-3 py-1 bg-amber-500/10 text-amber-800 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block border border-amber-500/30">
              Concierge Excellence
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#061224]">
              Why Choose Gamca Centre?
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Dedicated, reliable assistance designed specifically for expatriate candidates in Pakistan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#FAF9F6] p-8 rounded-2xl border border-slate-200 hover:border-amber-500 transition-all space-y-4 shadow-sm"
                >
                  <div className="w-12 h-12 bg-amber-500/10 text-amber-700 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#061224]">{feature.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 7. MEDICAL CENTERS PREVIEW */}
      <section className="py-20 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="px-3 py-1 bg-amber-500/10 text-amber-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block">
                Wafid Centers Directory
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#061224]">
                Medical Centers in Pakistan
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                Explore official Wafid medical diagnostic centers across Pakistani cities.
              </p>
            </div>
            <Link
              href="/medical-centers"
              className="mt-4 md:mt-0 text-xs font-bold uppercase tracking-wider text-amber-700 hover:text-amber-800 flex items-center gap-1"
            >
              View Full Directory & Select City →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topCenters.map((center) => (
              <div
                key={center.id}
                className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-amber-500/40 transition-all flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-slate-100 text-[#061224] rounded-full text-xs font-bold">
                      📍 {center.city}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#061224] mb-2">
                    <Link href={`/medical-centers/${center.slug}`} className="hover:text-amber-700 transition-colors">
                      {center.name}
                    </Link>
                  </h3>
                  {center.addressLine1 && (
                    <p className="text-xs text-slate-600 flex items-start gap-1.5">
                      <MapPin className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      <span>{center.addressLine1}</span>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. FAQS ACCORDION SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-14">
            <span className="px-3 py-1 bg-amber-500/10 text-amber-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#061224]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqList.map((item, idx) => (
              <div key={idx} className="bg-[#FAF9F6] p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <h3 className="text-base font-bold text-[#061224] flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  {item.q}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-7">{item.a}</p>
              </div>
            ))}
          </div>

          <div className="text-center pt-8">
            <Link
              href="/faqs"
              className="text-xs font-bold uppercase tracking-wider text-amber-700 hover:underline"
            >
              View All Frequently Asked Questions →
            </Link>
          </div>

        </div>
      </section>

      {/* 9. FINAL CTA BANNER */}
      <section className="py-20 bg-[#061224] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Get Your Wafid Medical Token Today
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Avoid delays and long queues. Apply online via Gamca Centre and let our concierge team assist you with fast medical token booking in Pakistan.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/book-medical-token"
              className="gold-btn px-9 py-4 rounded-xl text-xs uppercase tracking-wider font-extrabold flex items-center gap-2 shadow-xl"
            >
              <ShieldCheck className="w-5 h-5" />
              Get Medical Token
            </Link>
            <a
              href={siteConfig.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-xl text-xs uppercase tracking-wider font-extrabold flex items-center gap-2 shadow-lg shadow-[#25D366]/30 transition-all"
            >
              <WhatsAppIcon className="w-5 h-5 fill-current" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
