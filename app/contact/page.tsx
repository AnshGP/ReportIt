"use client";
import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Contact Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Purbachal Crime Branch
            </h2>
            <p className="mb-4 text-gray-300">
              We are here to handle reports, queries, and provide support for
              our community. Please reach out to us via the details below or
              visit our office.
            </p>

            <div className="space-y-3">
              <p>
                📍 <span className="font-medium">Location:</span>
                Purbachal Pally Unnayan Samity, Kolkata, West-Bengal, India
              </p>
              <p>
                📞 <span className="font-medium">Contact Numbers:</span>
                <br /> +91 98765 43210
                <br /> +91 91234 56789
                <br /> +91 90000 11111
              </p>
              <p>
                ✉️ <span className="font-medium">Email:</span>
                contact@purbachal.org
              </p>
            </div>
          </div>

          <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/org-building.webp"
              alt="Organization Building"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Find Us on the Map
          </h2>
          <div className="w-full h-96 rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.882399978842!2d88.377300!3d22.600100!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0275962c7e4d29%3A0xf33c6e2a12345!2sPurbachal%20Pally%20Unnayan%20Samity%2C%20Haltu%2C%20Kolkata!5e0!3m2!1sen!2sin!4v1695032140000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
