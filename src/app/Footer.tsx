import Link from "next/link";
import Image from "next/image";

import Github from "../assets/github.svg";
import YouTub from "../assets/youTube.svg";
import Linkedin from "../assets/linkedin.svg";

const Footer = () => {
  return (
    <footer className="footer bg-neutral text-neutral-content items-center p-4">
      <aside className="grid-flow-col items-center">
        <p>Copyright © 2024 by Sakhno Dmytro</p>
      </aside>
      <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <Link href="https://github.com/SakhnoDima">
          <Image src={Github} alt="Github logo" width={25} height={25} />
        </Link>
        <Link href="https://www.youtube.com/watch?v=K4ziF0MhbLc&t=1715s&ab_channel=freeCodeCamp.org">
          <Image src={YouTub} alt="Next.js 13 E-Commerce Tutorial" />
        </Link>
        <Link href="https://www.linkedin.com/feed/">
          <Image src={Linkedin} alt="Linkedin Sakhno Dmytro" />
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
