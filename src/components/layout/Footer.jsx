export default function Footer() {
  return (
    <>
      <div className="bg-pine-cone-200">
        <div className="content-container">
          <footer className="p-2 text-sm font-paragraph">
            <p>
              Original game made by Pixel Pandemic (2009-2015).{" "}
              <span>
                <a
                  href="https://www.facebook.com/zombiepandemicgame"
                  target="_blank"
                  className="light-hyperlink"
                >
                  Pixel Pandemic's ZP Facebook page
                </a>
              </span>
            </p>
            <p>
              Please join our{" "}
              <a
                href="https://discord.gg/Yrzsk7n6nf"
                target="_blank"
                className="light-hyperlink"
              >
                Discord
              </a>{" "}
              community for any questions or feedback.
            </p>
          </footer>
        </div>
        <div className="bg-[#aca19863] flex justify-center">
          <p className="p-2 text-sm font-paragraph">
            Copyright ©{new Date().getFullYear()}{" "}
            <span className="underline">Zombie Pandemic Recreated</span>{" "}
            contributors. This project is open-recreation and presented from the
            community's collaborative works.
          </p>
        </div>
      </div>
    </>
  );
}
