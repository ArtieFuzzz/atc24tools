<script lang="ts">
  let flightplan = $state<string>("");
  let sid = $state<string>("");
  let initialClimb = $state<string>("");
  let runway = $state<string>("");
  let transition = $state<string>("");
  let departureFrequency = $state<string>("");
  let squawk = $state<string>("");
  let deliveryFrequency = $state<string>("");
  const template =
    $state(`\u001b[1;37mPDC\u001b[0;0m \u001b[1;33m[TIMESTAMP]\u001b[0;0m
\u001b[1;37;42m[CALLSIGN]\u001b[0;0m \u001b[1;35m[ATYPE] [ADEP]\u001b[0;0m \u001b[1;33m[ETD]\u001b[0;0m
\u001b[1;37mCLEARED TO \u001b[1;35m[ADES]\u001b[0;0m \u001b[1;37mVIA\u001b[0;0m [RUNWAY] \u001b[1;35m[SID]\u001b[0;0m \u001b[1;37mDEP\u001b[0;0m [TRANSITION]
\u001b[1;37mROUTE\u001b[0;0m \u001b[1;35m[ROUTE]\u001b[0;0m
\u001b[1;37mCLIMB VIA SID TO\u001b[0;0m \u001b[1;35m[LEVEL]\u001b[0;0m
\u001b[1;37mDEP FREQ\u001b[0;0m \u001b[1;40;35m[FREQUENCY]\u001b[0;0m
\u001b[1;37mSQUAWK \u001b[1;40;35m[SSR]\u001b[0;0m
\u001b[1;37mONLY READBACK SID, SQUAWK CODE, AND BAY NO. ON\u001b[0;0m \u001b[1;40;37m[FREQUENCY]\u001b[0;0m`);

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
      .replace(
        "[RUNWAY]",
        runway ? `\u001b[1;35mRWY ${runway.toUpperCase()}\u001b[0;0m` : "",
      )
      .replace("[SID]", sid)
      .replace(
        "[TRANSITION]",
        transition
          ? `\u001b[1;35m${transition.toUpperCase()}\u001b[0;0m \u001b[1;37mTRANSITION\u001b[0;0m`
          : "",
      )
      .replace("[ROUTE]", flightinfo[5])
      .replace("[LEVEL]", initialClimb)
      .replace("[FREQUENCY]", departureFrequency.padEnd(7, "0"))
      .replace("[SSR]", squawk)
      .replace("[FREQUENCY]", deliveryFrequency.padEnd(7, "0"))
      .replace("  ", " ");

    navigator.clipboard.writeText(`\`\`\`ansi\n${populated}\n\`\`\``);
    return;
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
