export function Footer() {
  return (
    <footer className="bg-[#222222] pt-8 text-secondary">
      <div className="mx-auto max-w-5xl px-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="mb-4">
            <p>Emergency Electric INC</p>
            <p>7520 E. Pennington St. NE</p>
            <p>Lanesville, IN 47136</p>
          </div>
          <div className="mb-4">
            <p>Office: (812) 952-6003</p>
            <p>Emergency: (502) 727-4823</p>
            <div className="my-4" />
            <p>Office Hours</p>
            <p>Monday - Friday: 8am - 4pm</p>
          </div>
          <div className="mb-4">
            <p>24 Hour Service</p>
            <p>Licensed &amp; Insured</p>
            <p>Residential and Commercial</p>
          </div>
        </div>
        <p className="pt-8 pb-4 text-center">
          Copyright 2019 - All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
