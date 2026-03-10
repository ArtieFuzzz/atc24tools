<script lang="ts">
  import {
    nauticalMilePerMinute,
    angleFeetPerMinute,
    convertGradientPercentageToAngle,
    visualDescentPoint,
    gradientFeetPerMinute,
    convertGradientAngleToPercentage,
    feetPerNauticalMile,
  } from "$lib/calculations";

  let slope = $state<number>(3);
  let isGradient = $state<boolean>(false);
  let groundSpeed = $state<number>(185);
  let heightAboveTouchdown = $state<number>(600);

  let npm = $derived(nauticalMilePerMinute(groundSpeed));
  let ftpnm = $derived(
    isGradient
      ? feetPerNauticalMile(slope / 100, groundSpeed)
      : feetPerNauticalMile(
          convertGradientAngleToPercentage(slope),
          groundSpeed,
        ),
  );
  let vdp = $derived(
    visualDescentPoint(
      heightAboveTouchdown,
      isGradient ? convertGradientPercentageToAngle(slope / 100) : slope,
      groundSpeed,
    ),
  );
  let fpm = $derived(
    isGradient
      ? gradientFeetPerMinute(slope / 100, groundSpeed)
      : angleFeetPerMinute(slope, groundSpeed),
  );
</script>

<div class="w-screen h-screen flex justify-center items-center">
  <div class="w-fit h-fit flex-col justify-start items-start">
    <div class="justify-center items-center w-fit h-fit flex flex-row">
      <label for="slope">Slope</label>
      <input class="w-12" type="number" id="slope" bind:value={slope} />
      <label for="gradient">Is Gradient? (%)</label>
      <input type="checkbox" id="gradient" bind:checked={isGradient} />
      <label for="groundspeed">Ground Speed (kt)</label>
      <input type="number" id="groundspeed" bind:value={groundSpeed} />
      <label for="height">Height Above Threshold (FT)</label>
      <input type="number" id="height" bind:value={heightAboveTouchdown} />
    </div>

    <div class="w-fit h-fit flex-col">
      <div class="flex w-fit h-fit flex-col">
        <p>{npm ? npm.toFixed(2) : "N/A"}</p>
        <p>{ftpnm ? ftpnm.toFixed(0) : "N/A"}</p>
        <p>{vdp ? vdp.toFixed(2) : "N/A"}</p>
        <p>{fpm ? fpm.toFixed(0) : "N/A"}</p>
      </div>
      <div class="flex w-fit h-fit flex-col"></div>
      <p>
        <span class="font-bold">{npm ? npm.toFixed(2) : "N/A"}</span> NM per Minute
      </p>
      <p>{ftpnm ? ftpnm.toFixed(0) : "N/A"} FT per NM</p>
      <p>{vdp ? vdp.toFixed(2) : "N/A"} DME</p>
      <p>{fpm ? fpm.toFixed(0) : "N/A"} Feet Per Minute</p>
    </div>
  </div>
</div>
