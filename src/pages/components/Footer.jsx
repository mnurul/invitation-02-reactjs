import "../../app.scss";
import { Link } from "react-router-dom";

import icWhatsapp from "../../assets/icons/ic-whatsapp-gray.png";
import icInstagram from "../../assets/icons/ic-instagram-gray.png";
import icWebsite from "../../assets/icons/ic-website-gray.png";

export default function Footer() {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-3 opacity-50">
        <span className="text-xs text-soft-white roboto-light">
          Created by Wedinc
        </span>
        <div className="flex flex-row justify-center gap-2">
          <Link
            className="flex flex-row items-center justify-center gap-2"
            to="https://wa.me/621389017552?text=Halo,%20saya%20minat%20dengan%20undangannya"
            target="_blank"
          >
            <img src={icWhatsapp} className="h-5" loading="lazy" />
            <span className="text-xs text-soft-white roboto-light">
              081389017552
            </span>
          </Link>
          <Link
            className="flex flex-row items-center justify-center gap-2"
            to="https://www.instagram.com/wedinc.id/"
            target="_blank"
          >
            <img src={icInstagram} className="h-5" loading="lazy" />
            <span className="text-xs text-soft-white roboto-light">
              wedinc.id
            </span>
          </Link>
          <Link
            className="flex flex-row items-center justify-center gap-2"
            to="https://wedinc.id/"
            target="_blank"
          >
            <img src={icWebsite} className="h-5" loading="lazy" />
            <span className="text-xs text-soft-white roboto-light">
              wedinc.id
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
