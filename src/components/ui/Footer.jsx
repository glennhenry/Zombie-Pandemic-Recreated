import LightHyperlink from "./LightHyperlink";

export default function Footer() {
  return (
    <>
      <div className="bg-base-300">
        <div className="content-container">
          <footer className="font-paragraph p-2 text-sm">
            <p>Original game made by Pixel Pandemic (2009-2015).</p>
            <p>
              Please join our{" "}
              <LightHyperlink
                href="https://discord.gg/Yrzsk7n6nf"
                children={"Discord"}
              />{" "}
              community for any questions or feedback.
            </p>
          </footer>
        </div>
        <hr></hr>
        <div className="flex justify-center bg-base-300">
          <p className="font-paragraph p-2 text-sm">
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
