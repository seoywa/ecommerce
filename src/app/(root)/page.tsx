import { products } from "@/constants";
import Card from "@/src/components/Card";
import { getCurrentUser } from "@/src/lib/auth/actions";
import React from "react";

const RootPage = async () => {
  const user = await getCurrentUser();
  console.log(user);
  
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <section className="pb-12">
        <h2 id='latest' className="mb-6 text-heading-3 text-dark-900">Latest Shoes</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map(
            ({ id, title, subtitle, meta, imageSrc, price, badge }) => (
              <Card
                key={id}
                title={title}
                subtitle={subtitle}
                meta={meta}
                imageSrc={imageSrc}
                price={price}
                badge={badge}
              />
            )
          )}
        </div>
      </section>
    </main>
  );
};

export default RootPage;
