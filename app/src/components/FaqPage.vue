<script setup>
import { onMounted, ref } from 'vue';
import { store } from '../store.js';
import { router } from '../router.js';

const BIBTEX = `@article{nuglass,
  author        = {Zhang, Chao},
  title         = {NuGlass: A Fast and Interactive 3D Visualization of Neutrino Oscillations},
  year          = {2026},
  eprint        = {2608.25049},
  archivePrefix = {arXiv},
  primaryClass  = {hep-ph},
  note          = {Web app: \\url{https://czczc.github.io/nuglass/}; source code: \\url{https://github.com/czczc/nuglass}}
}`;

const copied = ref(false);

function copyBibtex() {
  navigator.clipboard.writeText(BIBTEX);
  copied.value = true;
  setTimeout(() => { copied.value = false; }, 1500);
}

function openView(id) {
  router.push('/' + id);
}

onMounted(() => {
  if (typeof store.faq === 'string') {
    document.getElementById('faq-' + store.faq)?.scrollIntoView({ block: 'start' });
  }
});
</script>

<template>
  <div class="faq-page">
    <article class="doc">
      <h2>FAQ</h2>
      <p class="sub">
        NuGlass is a fast, interactive, and animated 3D visualization of neutrino oscillations: the strange way neutrinos change
        from one type to another as they travel. Six 3D views are provided, each paired with live 2D plots.
        This page explains what each view shows and how the numbers behind it are computed; the
        “show details” blocks give the exact formulas. A full description of the physics, the views,
        and the software is in the accompanying paper,
        <a href="https://arxiv.org/abs/2608.25049" target="_blank" rel="noopener">arXiv:2608.25049</a>.
      </p>

      <section id="faq-engines">
        <h3>How the numbers are computed</h3>
        <p>
          All calculations are performed live in your web browser from the equations of three-flavor neutrino oscillations, including the extra effect neutrinos feel when they travel
          through the Earth (the “matter effect”). The default parameter values come from the
          world combined fit of all oscillation experiments
          (<a href="http://www.nu-fit.org" target="_blank" rel="noopener">NuFit 6.1, 2025</a>), and can be adjusted under “all parameters”. Antineutrinos are computed the same way with the relevant signs flipped.
        </p>
        <p>
          Two calculators share the work. <strong>NuFast-LBL</strong>
          (<a href="https://arxiv.org/abs/2405.02400" target="_blank" rel="noopener">arXiv:2405.02400</a>,
          <a href="https://github.com/PeterDenton/NuFast-LBL" target="_blank" rel="noopener">reference code</a>)
          is a very fast method by Denton &amp; Parke, quick enough to recompute a whole surface of
          ~26,000 points every time you drag a slider. It powers the oscillogram, biprobability and
          worldline views.
          The <strong>exact amplitude engine</strong> tracks the full quantum state of the neutrino, not
          just the final probabilities; the statesphere and phasors views need that extra information.
          The two calculators are cross-checked against each other to better than one part in ten million.
        </p>
        <details class="math">
          <summary>Show details: the equations behind every view</summary>
          <p>
            Three-flavor neutrinos in matter of constant density ρ evolve under the flavor-basis Hamiltonian
          </p>
          <p class="eq">H = (1/2E)&hairsp;U&hairsp;diag(0, Δm²<sub>21</sub>, Δm²<sub>31</sub>)&hairsp;U<sup>†</sup> + diag(±V, 0, 0),</p>
          <p>
            where U is the PMNS mixing matrix (parametrized by θ<sub>12</sub>, θ<sub>13</sub>, θ<sub>23</sub>, δCP) and
            V = √2&hairsp;G<sub>F</sub>&hairsp;N<sub>e</sub> is the matter potential, with electron density
            N<sub>e</sub> ∝ Y<sub>e</sub>ρ (Y<sub>e</sub> = 0.5). Diagonalizing
            H = W&hairsp;diag(λ<sub>1</sub>, λ<sub>2</sub>, λ<sub>3</sub>)&hairsp;W<sup>†</sup> gives the mixing matrix W
            and the eigenvalues λ<sub>i</sub> in matter (W → U and λ<sub>i</sub> → Δm²<sub>i1</sub>/2E in vacuum).
            A neutrino born as flavor α has, after a distance L, the flavor amplitudes and probabilities
          </p>
          <p class="eq">
            a<sub>β</sub>(L) = ⟨ν<sub>β</sub>| e<sup>−iHL</sup> |ν<sub>α</sub>⟩
            = Σ<sub>i</sub> W<sub>βi</sub> W<sub>αi</sub><sup>*</sup> e<sup>−iλ<sub>i</sub>L</sup>,
            &nbsp;&nbsp; P(ν<sub>α</sub>→ν<sub>β</sub>) = |a<sub>β</sub>(L)|².
          </p>
          <p>
            Everything drawn in the six views derives from this equation. In practical units the vacuum phases,
            and the matter term expressed in the same eV² units as the mass splittings, are
          </p>
          <p class="eq">Δ<sub>ij</sub> ≡ Δm²<sub>ij</sub>&hairsp;L/4E = 1.267 · (Δm²<sub>ij</sub>/eV²) · (L/km) · (GeV/E),</p>
          <p class="eq">a ≡ 2EV = 1.52588×10<sup>−4</sup> eV² · (Y<sub>e</sub>ρ / g&hairsp;cm<sup>−3</sup>) · (E/GeV),</p>
          <p>
            so vacuum oscillations depend on L and E only through L/E, while the matter term grows with E alone.
            Antineutrinos are obtained by δCP → −δCP and V → −V; the inverted mass ordering by flipping the sign
            of Δm²<sub>31</sub> at fixed magnitude. NuFast-LBL evaluates P directly in real arithmetic, with one
            Newton refinement of the matter eigenvalues; the exact engine diagonalizes the complex H with a Jacobi
            eigensolver and returns the amplitudes a<sub>β</sub>, the individual terms
            c<sub>i</sub> = W<sub>βi</sub>W<sub>αi</sub><sup>*</sup>, and the eigenvalues λ<sub>i</sub>. Over
            42,000 parameter points and all nine flavor channels the two engines agree to
            2.3×10<sup>−7</sup> in probability (section 2 of the paper).
          </p>
        </details>
        <p>
          <strong>Experiment presets</strong>: DUNE, NOvA and T2K each set the travel
          distance, rock density and beam energy range of a real accelerator experiment; the reactor
          experiments JUNO, KamLAND and Daya Bay (offered for the νe→νe channel) do the same at MeV
          energies. Picking one sets every parameter to that experiment’s values.
        </p>
      </section>

      <section id="faq-oscillogram">
        <h3>Oscillogram</h3>
        <p>
          A landscape of probability: the surface’s height and color show the chance that a neutrino flavor has turned into another flavor (or itself) by the time it is detected. Left-to-right is the
          neutrino’s energy E; the depth axis is your choice of a second variable: the travel distance L,
          the CP phase δCP (the parameter that can make neutrinos and antineutrinos behave differently),
          or the density ρ of the rock the beam passes through.
        </p>
        <p>
          The white line is a slice through the landscape at the current slider setting, and it is
          exactly the curve drawn in the first 2D panel below (probability vs energy, for neutrinos and
          antineutrinos, with the experiment’s energy peak dashed). The second 2D panel shows how the
          probability at the current energy changes as δCP goes around its full circle.
        </p>
        <p>
          Press ▶ on the “animate” row to set the picture in motion, sweeping the distance, the energy,
          or δCP; the matching slider in the controls panel moves along with it, so you can pause
          anywhere and continue by hand. The front / top / side buttons swing the camera to flat views:
          “top” looks straight down and turns the surface into the classic color-map oscillogram that
          experiments publish.
        </p>
        <details class="math">
          <summary>Show details</summary>
          <p>
            The surface is P(ν<sub>α</sub>→ν<sub>β</sub>) = |a<sub>β</sub>|² for the channel selected in the header,
            computed in matter on a grid over (E, z), where the second axis z is L (0 to twice the baseline),
            δCP (0–360°), or ρ (0–5 g/cm³); the other variables stay at their slider values. Height and color both
            encode P. The white line is the cut at the marker's z, i.e. the P(E) curve of the first 2D panel; the
            second panel is the cut at the current E along δCP. In the top view the surface reduces to the
            standard 2D oscillogram, a color map of P over E and z.
          </p>
        </details>
        <p><button class="linkish" @click="openView('oscillogram')">open this view →</button></p>
      </section>

      <section id="faq-biprob">
        <h3>Biprobability</h3>
        <p>
          Two chances plotted against each other: the probability that a neutrino becomes a
          different flavor (horizontal) versus the same probability for antineutrinos (vertical), at
          one energy and distance. As δCP sweeps through its full circle, the point traces out an
          ellipse. The 3D view stacks those ellipses along energy, for the two possible orderings of the
          neutrino masses (orange = normal, blue = inverted); the small spheres mark the current δCP,
          and the connecting line shows the ordering difference.
          (After Minakata &amp; Nunokawa,
          <a href="https://arxiv.org/abs/hep-ph/0108085" target="_blank" rel="noopener">arXiv:hep-ph/0108085</a>.)
        </p>
        <p>
          How to read it: if neutrinos and antineutrinos behaved identically, the point would sit on the
          gray diagonal; its distance from that diagonal is CP violation. The gap between
          the orange and blue rings is what lets experiments tell the two mass orderings apart; where
          the rings overlap, that energy alone cannot decide.
        </p>
        <details class="math">
          <summary>Show details</summary>
          <p>
            At fixed E and L the plotted point is (P(ν<sub>μ</sub>→ν<sub>e</sub>), P(ν̄<sub>μ</sub>→ν̄<sub>e</sub>)),
            the antineutrino probability computed with δCP → −δCP and V → −V. Because the amplitude is linear in
            e<sup>±iδCP</sup>, each probability has the form A + B&hairsp;cos&hairsp;δCP + C&hairsp;sin&hairsp;δCP
            (exactly, also in matter), so the point traces an ellipse as δCP runs through 0–360°. The 3D view
            stacks that ellipse for every energy in the experiment's window, once per mass ordering (inverted:
            Δm²<sub>31</sub> → −|Δm²<sub>31</sub>|). The gray diagonal P = P̄ is the CP-conserving line. The 2D
            panel is the front-view projection at the marker energy, drawn 1:1: the standard Minakata–Nunokawa
            diagram.
          </p>
        </details>
        <p><button class="linkish" @click="openView('biprob')">open this view →</button></p>
      </section>

      <section id="faq-sphere">
        <h3>Statesphere</h3>
        <p>
          The neutrino’s quantum state drawn as an arrow inside a globe. The north pole means “certainly
          an electron neutrino”, the south pole “certainly a muon neutrino”, and everywhere in between
          is a quantum mixture of the two. As the neutrino travels, the arrow swings around and traces
          the colored path; press ▶ to watch it move.
        </p>
        <p>
          How to read it: a textbook two-type oscillation would keep the arrow’s tip on the globe’s
          surface. Here the tip dips inside: a shorter arrow means part of the probability has leaked
          into the third type, which this picture cannot show directly. The 2D panel
          plots all three probabilities along the sweep, with its marker synced to the 3D arrow.
        </p>
        <details class="math">
          <summary>Show details</summary>
          <p>
            This globe is the
            <a href="https://en.wikipedia.org/wiki/Bloch_sphere" target="_blank" rel="noopener">Bloch
            sphere</a> of a quantum state, applied to the two flavors on the poles. Writing
            a<sub>e</sub> and a<sub>μ</sub> for the flavor amplitudes defined above, the arrow is
          </p>
          <p class="eq">b = ( 2&hairsp;Re(a<sub>e</sub>a<sub>μ</sub><sup>*</sup>), 2&hairsp;Im(a<sub>e</sub>a<sub>μ</sub><sup>*</sup>), |a<sub>e</sub>|² − |a<sub>μ</sub>|² ),</p>
          <p>
            the expectation values of the three Pauli matrices in the two-flavor subspace. The height toward the
            north pole is the probability difference P<sub>e</sub> − P<sub>μ</sub>; the two horizontal components
            are the real and imaginary parts of the interference term (the “coherence”) between the flavors. For a
            normalized two-flavor state cos(θ/2)|ν<sub>μ</sub>⟩ + e<sup>iφ</sup>sin(θ/2)|ν<sub>e</sub>⟩ this
            reduces to the familiar polar form (sin&hairsp;θ&hairsp;cos&hairsp;φ, sin&hairsp;θ&hairsp;sin&hairsp;φ,
            cos&hairsp;θ) on the unit sphere. |b| = 1 therefore means a pure two-flavor state; anything shorter
            means probability sits in the third flavor. For the ντ-vs-νμ pole choice, replace a<sub>e</sub> with
            a<sub>τ</sub>. A faithful three-flavor generalization would use the eight Gell-Mann matrices instead of
            the three Pauli matrices, but pure states then occupy a curved 4-dimensional subset of an 8-dimensional
            space, which has no faithful 3D rendering; projecting onto two-flavor subspaces is the price of a
            picture.
          </p>
        </details>
        <p><button class="linkish" @click="openView('sphere')">open this view →</button></p>
      </section>

      <section id="faq-phasors">
        <h3>Phasors</h3>
        <p>
          Why oscillation happens, drawn as directly as possible. Quantum mechanics adds up the three
          ways a neutrino can become another neutrino as three arrows in a plane: one for each
          neutrino mass, each rotating at its own speed as the neutrino travels. The colored curves show
          the arrows chained head to tail, the white curve is their total amplitude, and the curve on the floor is
          the resulting probability (amplitude squared).
        </p>
        <p>
          How to read it: the probability peaks where the arrows line up and vanishes where they cancel.
          Oscillation is interference, the same phenomenon as overlapping ripples on a pond. Changing
          δCP rotates the arrows relative to each other (moving where they align), while energy and rock
          density change the arrows’ lengths.
        </p>
        <details class="math">
          <summary>Show details</summary>
          <p>
            For the appearance channel ν<sub>μ</sub>→ν<sub>β</sub> (β = e or τ, chosen in the view), the amplitude
            is split into its three matter-eigenstate terms,
          </p>
          <p class="eq">
            A(L) = a<sub>β</sub>(L) = Σ<sub>i</sub> c<sub>i</sub> e<sup>−iλ<sub>i</sub>L</sup>,
            &nbsp;&nbsp; c<sub>i</sub> = W<sub>βi</sub> W<sub>μi</sub><sup>*</sup>.
          </p>
          <p>
            Each term is a complex number of fixed length |c<sub>i</sub>| rotating at its own angular rate
            λ<sub>i</sub>. Complex numbers add like 2D vectors, so the three terms are drawn head to tail in the
            complex plane, with the total A as a separate arrow and P = |A|² on the floor. An overall phase does
            not change |A|², so the eigenvalues are shifted by λ → λ − λ<sub>min</sub>: the lowest arm stays fixed
            and only the relative rates λ<sub>2</sub> − λ<sub>1</sub> and λ<sub>3</sub> − λ<sub>1</sub> are seen
            rotating. At L = 0 the three arms close into a triangle, because
            Σ<sub>i</sub> W<sub>βi</sub>W<sub>μi</sub><sup>*</sup> = 0 for β ≠ μ (unitarity of W). In matter at
            long-baseline energies the ν<sub>μ</sub>→ν<sub>τ</sub> triangle has one arm almost collapsed, because
            the intermediate matter eigenstate becomes nearly pure ν<sub>e</sub>, leaving a two-phasor
            interference (section 5 of the paper).
          </p>
        </details>
        <p><button class="linkish" @click="openView('phasors')">open this view →</button></p>
      </section>

      <section id="faq-tube">
        <h3>Flavortube</h3>
        <p>
          Follow a neutrino along its journey and watch its identity mix. Each slice of the tube is
          a pie chart of the three possibilities at that distance: still a muon neutrino (blue), turned
          into a tau neutrino (green), or turned into an electron neutrino (red). The tube’s cross-section area
          never changes, because the three chances always add up to 100%. The disk rides the animation
          marker and shows the mix at one spot. The tube also sits on an energy axis: drag the E slider
          (or animate over E) and the whole tube glides along it while its pattern stretches; lower
          energies flip flavor faster.
          Switch the display to “stacked bands” and the same information unrolls into a box.
        </p>
        <details class="math">
          <summary>Show details</summary>
          <p>
            Each cross-section shows P<sub>e</sub>, P<sub>μ</sub>, P<sub>τ</sub> = |a<sub>e</sub>|²,
            |a<sub>μ</sub>|², |a<sub>τ</sub>|² at that L (initial flavor set by the channel) as angular sectors of
            area proportional to each probability; unitarity, P<sub>e</sub> + P<sub>μ</sub> + P<sub>τ</sub> = 1, is
            why the radius never changes. In the stacked-bands display the red surface over the (L, E) plane is
            P<sub>e</sub>, the blue surface is P<sub>e</sub> + P<sub>μ</sub>, and the gap up to the box ceiling
            (P = 1) is P<sub>τ</sub>. The red surface is the Oscillogram surface for ν<sub>μ</sub>→ν<sub>e</sub>,
            so this volume is the unitarity-complete oscillogram: it shows where the disappeared flux goes. The two
            2D panels are the cuts at the shared E (fractions vs L) and at the marker's L (fractions vs E).
          </p>
        </details>
        <p><button class="linkish" @click="openView('tube')">open this view →</button></p>
      </section>

      <section id="faq-loe">
        <h3>Worldline</h3>
        <p>
          The other views sweep distance or energy separately; this one uses the variable oscillation
          actually depends on: L/E (distance traveled divided by energy) is proportional to the proper time the neutrino itself
          experiences, so this axis is the neutrino's own worldline, with every experiment pinned
          somewhere along it. In vacuum, every oscillation probability is a function of the single
          combination L/E, so each channel collapses onto one
          universal curve. Both oscillation frequencies
          are visible at once: the fast atmospheric wiggle (first dip near L/E ≈ 500 km/GeV) and the
          slow solar valley (near L/E ≈ 15,000 km/GeV) with the fast wiggle riding on top of it.
          The thick
          curve is the channel selected in the header; the checkboxes overlay the others.
        </p>
        <p>
          The third axis shows what breaks this elegant collapse: matter. Traveling through rock adds
          an effect that grows with energy E itself, not with L/E, so two neutrinos with the same L/E
          but different energies no longer oscillate identically. The colored surface (drawn like the
          Oscillogram view) spreads the selected channel across the experiment's energy window, computed with the matter effect at the
          current density ρ: at ρ = 0 the surface is perfectly flat along the energy axis (the front
          view reproduces the vacuum curve). The line riding the surface is the cut through the
          experiment's energy window at the fixed baseline L, and it is the same spectrum drawn in the second 2D panel.
        </p>
        <details class="math">
          <summary>Show details</summary>
          <p>In vacuum (W → U), |a<sub>β</sub>|² expands into the standard oscillation formula</p>
          <p class="eq">
            P(ν<sub>α</sub>→ν<sub>β</sub>) = δ<sub>αβ</sub>
            − 4 Σ<sub>i&gt;j</sub> Re(U<sub>αi</sub><sup>*</sup>U<sub>βi</sub>U<sub>αj</sub>U<sub>βj</sub><sup>*</sup>) sin²Δ<sub>ij</sub>
            + 2 Σ<sub>i&gt;j</sub> Im(U<sub>αi</sub><sup>*</sup>U<sub>βi</sub>U<sub>αj</sub>U<sub>βj</sub><sup>*</sup>) sin&hairsp;2Δ<sub>ij</sub>,
          </p>
          <p>
            which depends on L and E only through L/E inside the phases
            Δ<sub>ij</sub> = 1.267 · Δm²<sub>ij</sub>[eV²] · L[km] / E[GeV]. The front-plane curves are this
            formula for all four channels against log<sub>10</sub>(L/E) from 30 to 10<sup>5</sup> km/GeV; the
            first atmospheric extremum sits at Δ<sub>31</sub> = π/2 (L/E ≈ 500 km/GeV) and the solar valley at
            Δ<sub>21</sub> = π/2 (≈ 1.6×10<sup>4</sup> km/GeV). Dashed markers pin each preset at its flux-peak
            L/E. The optional averaging cross-fades sin²Δ<sub>31</sub> into its mean ½ as the atmospheric phase
            grows past ~15–25 rad, mimicking finite energy resolution. The surface is the full matter calculation
            for the selected channel across the experiment's energy window (each row clipped to L ≤ 2× baseline)
            at the shared ρ: the matter term a grows with E at fixed L/E, so each energy peels away from the vacuum
            curve by a different amount. The line on the surface is the cut at the experiment's baseline L,
            identical to the second 2D panel's spectrum (vacuum curve dashed); at ρ = 0 the surface is flat along
            E and its front view lies on the vacuum curve.
          </p>
        </details>
        <p><button class="linkish" @click="openView('loe')">open this view →</button></p>
      </section>

      <section id="faq-experiments">
        <h3>Custom experiments</h3>
        <p>
          The experiment chips in the top bar are presets: each sets the distance to the
          detector, the rock density along the way, and the source's energy window. The chip row
          follows the oscillation channel selected next to the view tabs — beam channels
          (νμ→νe, νμ→νμ, νμ→ντ) offer DUNE / NOvA / T2K, while νe→νe offers the reactor
          experiments JUNO / KamLAND / Daya Bay (which also switch the particle toggle to
          antineutrinos, since reactors emit ν̄e). The <span class="k">+</span>
          chip opens a page where you can build your own: name it, set the baseline and beam, declare
          which channels it measures and whether the source is antineutrinos, and, if you want to
          explore, override the oscillation parameters themselves. The inputs switch between GeV·km
          and MeV·m for reactor-scale setups, and the form can be reset to DUNE or JUNO defaults.
          Saved experiments live in your browser's localStorage (nothing is uploaded), which persists across visits. Loading one makes it the active experiment everywhere.
        </p>
      </section>

      <section id="faq-cite">
        <h3>Paper and how to cite</h3>
        <p>
          NuGlass is described in C. Zhang, <em>NuGlass: A Fast and Interactive 3D Visualization of Neutrino
          Oscillations</em>,
          <a href="https://arxiv.org/abs/2608.25049" target="_blank" rel="noopener">arXiv:2608.25049</a>
          (2026). If you use NuGlass in a paper or talk, please cite it as:
        </p>
        <pre class="bib">{{ BIBTEX }}</pre>
        <p><button class="linkish" @click="copyBibtex">{{ copied ? 'copied ✓' : 'copy BibTeX' }}</button></p>
      </section>
    </article>
  </div>
</template>

<style scoped>
.faq-page {
  flex: 1;
  min-width: 0;
  overflow-y: auto;
  background: var(--bg);
}
.doc {
  max-width: 820px;
  margin: 0 auto;
  padding: 34px 28px 80px;
  font-size: 16px;
  line-height: 1.7;
}
h2 { font-size: 26px; margin: 0 0 6px; }
.sub { color: var(--muted); margin: 0 0 10px; }
section {
  margin-top: 26px;
  padding-top: 14px;
  border-top: 1px solid var(--border);
}
h3 {
  font-family: var(--font-mono);
  font-size: 17px;
  color: var(--accent);
  margin: 0 0 10px;
}
p { margin: 10px 0; }
.k {
  font-family: var(--font-mono);
  font-size: 14.5px;
  background: var(--surface-2);
  border-radius: 4px;
  padding: 0 5px;
  white-space: nowrap;
}
.linkish { font-size: 14px; }
details.math {
  margin: 10px 0;
  padding: 6px 14px;
  font-size: 15px;
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 6px;
}
details.math summary {
  cursor: pointer;
  font-family: var(--font-mono);
  font-size: 14px;
  color: var(--accent);
  padding: 4px 0;
}
details.math p { margin: 8px 0; }
.eq {
  font-family: var(--font-mono);
  font-size: 14px;
  text-align: center;
  overflow-x: auto;
  padding: 2px 0;
}
.bib {
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.5;
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 12px 14px;
  overflow-x: auto;
}
a { color: var(--accent); }
</style>
