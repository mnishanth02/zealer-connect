import { Button } from "@repo/ui/Button";
import { Switch } from "@repo/ui/Switch";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        Nishanth Muran
        <Button>Save</Button>
        <Switch></Switch>
      </div>
    </main>
  );
}
