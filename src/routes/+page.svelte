<script lang="ts">
  function openWindow(url: string, width: number, height: number) {
    window.open(url, "_blank", `width=${width},height=${height}`);
  }
</script>

<div class="w-screen h-screen flex flex-col justify-center items-center">
  <div class="flex flex-col gap-4">
    <div>
      <h1 class="text-6xl"><p class="font-bold">ATC24 Tools</p></h1>
      <p class="font-mono">
        Ports functionality of tools from <a
          href="https://virtualairtrafficsystem.com/">VatSys</a
        > for use in ATC24.
      </p>
    </div>

    <div class="justify-start items-start gap-3">
      <h2 class="text-3xl font-bold">List of Tools</h2>
      <ol>
        <li>
          <button
            onclick={() => openWindow("/pdc", 707, 566)}
            class="font-mono text-white hover:cursor-pointer"
            >PDC Generator</button
          >
        </li>
      </ol>
    </div>
  </div>
</div>

