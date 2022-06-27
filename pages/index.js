import React from 'react'
import { Product,FooterBanner,HeroBanner,Footer } from '../components';
import { client } from '../lib/client';



/***
 * Notes: If you export a function called 
 * getServerSideProps (Server-Side Rendering) from a page,
 *  Next.js will pre-render this page on each request 
 * using the data returned by getServerSideProps.
 * 
 * developer note: its bit different than react js. 
 * normally we use useEffect hook and fetch data.
 * in next js user getServerSideProps for this mission.
 * 
 */
const Home = ({ products,bannerData}) =>  (
    <>
    <HeroBanner heroBanner={bannerData.length && bannerData[0]}  />
    {console.log(bannerData)}
    <div className='products-heading'>
      <h2>Bes Selling Products</h2>
      <p>Speakers of many variations</p>
    </div>
    <div className="products-container">
      {products?.map((product) => <Product key={product._id} product={product} />)}
    </div>

    <FooterBanner footerBanner={bannerData && bannerData[0]}/>
    </>
  );


  export const getServerSideProps = async () => {
    const query = '*[_type == "product"]';
    const products = await client.fetch(query);
  
    const bannerQuery = '*[_type == "banner"]';
    const bannerData = await client.fetch(bannerQuery);
  
    return {
      props: { products, bannerData }
    }
  }

export default Home;