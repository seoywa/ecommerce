import { products } from "@/constants";
import Card from "@/src/components/Card";
import React from "react";

const RootPage = () => {
  return (
    <main>
      <section>
        <h2>Latest Shoes</h2>
        <div>
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
