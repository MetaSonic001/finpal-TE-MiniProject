import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px]">
            <Image
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
              alt="About Us"
              fill
              className="object-cover rounded-2xl"
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">About Finsepa</h2>
            <p className="text-xl text-gray-600 mb-6">
              We're dedicated to revolutionizing financial operations for businesses of all sizes. Our platform combines cutting-edge technology with user-friendly interfaces to deliver exceptional financial solutions.
            </p>
            <ul className="space-y-4">
              {[
                "10+ years of industry experience",
                "Trusted by 1000+ businesses",
                "24/7 customer support",
                "99.9% uptime guarantee"
              ].map((item, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}