<script>
  import Pdc from "../components/PDC.svelte";
</script>

<div
  class="w-screen h-screen flex flex-col justify-center gap-10 items-center p-4"
>
  <div class="w-full h-auto">
    <h1 class="text-6xl"><p class="font-bold">ATC24 Tools</p></h1>
    <p>
      Ports functionality of tools from <a
        href="https://virtualairtrafficsystem.com/">VatSys</a
      > for use in ATC24.
    </p>
  </div>
  <div
    class="w-full h-full justify-center grid grid-flow-col grid-cols-auto gap-4"
  >
    <Pdc />
  </div>
</div>

