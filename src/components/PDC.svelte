<script lang="ts">
  let flightplan = $state<string>("");
  let sid = $state<string>("");
  let initialClimb = $state<string>("");
  let runway = $state<string>("");
  let transition = $state<string>("");
  let departureFrequency = $state<string>("");
  let squawk = $state<string>("");
  let deliveryFrequency = $state<string>("");
  const template = $state(`PDC [TIMESTAMP]
[CALLSIGN] [ATYPE] [ADEP] [ETD]
CLEARED TO [ADES] VIA [RUNWAY] [SID] DEP [TRANSITION]
ROUTE [ROUTE]
CLIMB VIA SID TO [LEVEL]
DEP FREQ [FREQUENCY]
SQUAWK [SSR]
ONLY READBACK SID, SQUAWK CODE, AND BAY NO. ON [FREQUENCY]`);

  function addMinutes(minutes: number) {
    const currentTimestamp = new Date().getTime();

    return new Date(currentTimestamp + minutes * 60000);
  }

  function generatePDC() {
    const utc = new Date();
    const hours = utc.getUTCHours().toString().padStart(2, "0");
    const minutes = utc.getUTCMinutes().toString().padStart(2, "0");
    const seconds = utc.getUTCSeconds().toString().padStart(2, "0");
    const estimatedTime = addMinutes(5);
    const etaHours = estimatedTime.getUTCHours().toString().padStart(2, "0");
    const etaMinutes = estimatedTime
      .getUTCMinutes()
      .toString()
      .padStart(2, "0");
    const flightinfo = flightplan
      .replace("_ _", "")
      .trim()
      .split("\n")
      .slice(2)
      .map((c) => c.split(":")[1].trim());

    const populated = template
      .replace("[TIMESTAMP]", `${hours}${minutes}${seconds}`)
      .replace("[CALLSIGN]", flightinfo[0])
      .replace("[ATYPE]", flightinfo[1])
      .replace("[ADEP]", flightinfo[3])
      .replace("[ETD]", `${etaHours}${etaMinutes}`)
      .replace("[ADES]", flightinfo[4])
      .replace("[RUNWAY]", runway ? `RWY ${runway.toUpperCase()}` : "")
      .replace("[SID]", sid)
      .replace(
        "[TRANSITION]",
        transition ? `${transition.toUpperCase()} TRANSITION` : "",
      )
      .replace("[ROUTE]", flightinfo[5])
      .replace("[LEVEL]", initialClimb)
      .replace("[FREQUENCY]", departureFrequency.padEnd(7, "0"))
      .replace("[SSR]", squawk)
      .replace("[FREQUENCY]", deliveryFrequency.padEnd(7, "0"))
      .replace("  ", " ");

    navigator.clipboard.writeText(`\`\`\`\n${populated}\n\`\`\``);
  }
</script>

<div class="p-4 w-full h-fit">
  <div class="w-full h-full">
    <h3 class="font-bold"><p class="text-2xl">PDC Generator</p></h3>
    <p><span class="font-bold">*</span> - Denotes a required field.</p>

    <div class="flex flex-col gap-4 mt-2">
      <div class="flex flex-row justify-start items-start gap-3 w-fit h-full">
        <div class="flex flex-col h-full">
          <label for="flightplan">Flight Plan*</label>
          <textarea
            name="flightplan"
            id="flightplan"
            rows="13"
            cols="45"
            placeholder="Paste ATC24 Flight Plan Here"
            required
            class="border-1 border-black rounded-sm resize-none p-2 overflow-clip"
            bind:value={flightplan}
          ></textarea>
        </div>

        <div class="flex flex-row flex-wrap gap-2">
          <div class="flex flex-col">
            <label for="sid">SID*</label>
            <input
              type="text"
              id="sid"
              required
              placeholder="LOGAN4"
              bind:value={sid}
              autocapitalize="characters"
            />
          </div>

          <div class="flex flex-col">
            <label for="climb">Initial Climb*</label>
            <input
              type="text"
              id="climb"
              required
              placeholder="2000"
              bind:value={initialClimb}
            />
          </div>

          <div class="flex flex-col">
            <label for="runway">Runway</label>
            <input
              type="text"
              id="runway"
              placeholder="25L"
              bind:value={runway}
              maxlength="3"
              autocapitalize="characters"
            />
          </div>

          <div class="flex flex-col">
            <label for="transition">Transition</label>
            <input
              type="text"
              id="transition"
              placeholder="DINER1"
              bind:value={transition}
              autocapitalize="characters"
            />
          </div>

          <div class="flex flex-col">
            <label for="departurefrequency">Departure Frequency*</label>
            <input
              type="text"
              id="departurefrequency"
              required
              placeholder="118.700"
              bind:value={departureFrequency}
              maxlength="7"
            />
          </div>

          <div class="flex flex-col">
            <label for="deliveryfrequency">Delivery Frequency*</label>
            <input
              type="text"
              id="deliveryfrequency"
              required
              placeholder="118.55"
              bind:value={deliveryFrequency}
              maxlength="7"
            />
          </div>

          <div class="flex flex-col">
            <label for="ssr">SSR (Squawk)*</label>
            <input
              type="number"
              id="ssr"
              required
              placeholder="2107"
              bind:value={squawk}
              max="7777"
              min="1000"
            />
          </div>

          <button
            onclick={() => generatePDC()}
            class="p-1 px-6 hover:bg-pink hover:text-white hover:border-white rounded-sm border-2 duration-150 linear"
            >Copy</button
          >
        </div>
      </div>
    </div>
  </div>
</div>

<style lang="postcss">
  :where(input) {
    border-width: 1px;
    border-color: white;
    border-radius: 0.25rem;
    padding-left: 0.25rem;
    color: white;

    &:user-invalid {
      border-color: red;
    }

    &:user-valid {
      border-color: green;
    }
  }

  :where(textarea) {
    color: white;
    border-color: white;
  }

  :where(label) {
    font-weight: bold;
  }
</style>
