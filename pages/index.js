import Head from "next/head";
import Content from "../Components/Content";
import Blog from "../Components/Blog";
import Features from "../Components/Features";
import Testimonials from "../Components/Testimonials";
import Carousel from "../Components/Carousel";
import Image from "next/image";
export default function Home() {
  return (
    <div>
      <Head>
        <title>Cold Spray - IIT Ropar</title>
        <meta name="description" content=""></meta>
        <meta name="keywords" content=""></meta>
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <Image
        src="/images/coldsprayprocess.jpg"
        alt="..."
        layout="responsive"
        height={20}
        width={500}
        priority
      />
      <Carousel />
      <Blog />
      <Features />
      <Testimonials />
    </div>
  );
}
