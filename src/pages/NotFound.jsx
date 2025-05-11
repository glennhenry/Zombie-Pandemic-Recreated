import LightHyperlink from "../components/ui/LightHyperlink";

export default function NotFound() {
  return (
    <div className="flex h-[100dvh] flex-col items-center justify-center">
      <h1 className="text-3xl text-black">404 Not Found</h1>
      <LightHyperlink href="/" target="_self" children={"Back"} />
    </div>
  );
}
