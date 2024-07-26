import "../../app.scss";
import style from "./cover.module.scss";
import { Link, useSearchParams } from "react-router-dom";
import videoBG from "../../assets/videos/video-bg-main.mp4";
import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import { useContext } from "react";
import { DarkMode } from "../../context/DarkMode";
import { IoMailOpenOutline } from "react-icons/io5";
import { IoIosQrScanner } from "react-icons/io";
import { coupleCover } from "../../assets";

const Cover = () => {
  const [searchParams] = useSearchParams();

  // multi language
  const [t] = useTranslation("global");

  // darkmode
  const { isDarkMode, setIsDarkMode } = useContext(DarkMode);

  return (
    <>
      <div className="w-full h-full">
        <div
          className={`${style.cover} container max-w-screen-sm h-screen flex flex-col justify-center items-center relative`}
        >
          {/* background video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="object-cover w-full h-full"
          >
            <source src={videoBG}></source>
          </video>
          {/* content */}
          <div className="absolute w-full h-full">
            <div>
              <Header />
            </div>
            <div className="flex flex-col justify-center px-10">
              <div className="flex justify-center">
                <img src={coupleCover} className="h-[265px] w-fit" />
              </div>
              <div className="flex flex-row items-center justify-between mt-3">
                <span className=" text-xs tracking-[1px] text-white roboto-light">
                  {t("cover.title")}
                </span>
                <span className=" text-xs tracking-[1px] text-white roboto-light">
                  {import.meta.env.VITE_CLIENT_DATE}
                </span>
              </div>
              <div className="flex flex-col mt-1">
                <span className=" text-4xl tracking-[3px] text-white roboto-medium">
                  {import.meta.env.VITE_CLIENT_WOMAN}
                </span>
                <span className=" text-4xl tracking-[3px] text-white roboto-medium -mt-1">
                  {import.meta.env.VITE_CLIENT_MAN}
                </span>
              </div>
              <div className="flex flex-col">
                <span className=" text-xs font-light tracking-[1px] text-white roboto-light mt-5">
                  {t("cover.to")}
                </span>

                {searchParams.get("to") != null ? (
                  <div>
                    <span
                      className="text-base text-white tracking-[3px] roboto-medium border-b-2 w-[150px] border-soft-white pb-1"
                      style={{ textTransform: "uppercase" }}
                    >
                      {searchParams.get("to")}
                    </span>
                  </div>
                ) : (
                  <span className="text-base text-white tracking-[3px] w-[150px] roboto-medium">
                    {t("cover.guest")}
                  </span>
                )}

                <div className="flex mt-3">
                  {searchParams.get("to") != null ? (
                    <Link
                      to={`/invitation/?to=${searchParams.get("to")}`}
                      className={`flex flex-row items-center justify-center gap-2 px-5 py-2 mt-3 rounded-2xl ${
                        isDarkMode ? "bg-dark-green-1" : "bg-dark-green"
                      }`}
                    >
                      <IoMailOpenOutline
                        className={`text-xl text-soft-white`}
                      />
                      <span
                        className={`text-xs text-soft-white roboto-regular`}
                      >
                        {t("cover.openInvitation")}
                      </span>
                    </Link>
                  ) : (
                    <Link
                      to={"#"}
                      className={`flex flex-row items-center justify-center gap-2 px-5 py-2 mt-3 rounded-2xl ${
                        isDarkMode ? "bg-dark-green-1" : "bg-dark-green"
                      }`}
                    >
                      <IoMailOpenOutline
                        className={`text-xl text-soft-white`}
                      />
                      <span
                        className={`text-xs text-soft-white roboto-regular`}
                      >
                        {t("cover.openInvitation")}
                      </span>
                    </Link>
                  )}
                </div>

                <div className="flex">
                  <div
                    className={`flex flex-row items-center justify-center gap-2 px-5 py-2 mt-2 rounded-2xl w-[150px] ${
                      isDarkMode ? "bg-dark-green-1" : "bg-dark-green"
                    }`}
                  >
                    <IoIosQrScanner className={`text-xl text-soft-white`} />
                    <label className={`text-xs text-soft-white roboto-regular`}>
                      <input
                        style={{ display: "none" }}
                        type="file"
                        accept="image/*"
                        capture="environment"
                      />
                      {t("cover.qr")}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cover;
