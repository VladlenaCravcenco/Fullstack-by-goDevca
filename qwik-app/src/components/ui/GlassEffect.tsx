import { component$, Slot, useSignal, type QwikIntrinsicElements } from '@builder.io/qwik';
import './GlassEffect.css';

type GlassEffectProps = QwikIntrinsicElements['div'] & {
  class?: string;
};

export const GlassEffect = component$<GlassEffectProps>(({ class: userClass }) => {
  const isHovered = useSignal(false);
  const isActive = useSignal(false);

  return (
    <div
      class={[
        'glass-wrap',
        userClass,
        isHovered.value && 'glass-hover',
        isActive.value && 'glass-active',
      ]}
      onMouseEnter$={() => (isHovered.value = true)}
      onMouseLeave$={() => {
        isHovered.value = false;
        isActive.value = false;
      }}
      onMouseDown$={() => (isActive.value = true)}
      onMouseUp$={() => (isActive.value = false)}
    >
      <div class="glass-shadow"></div>
      <button class="glass-btn">
        <span>
          <Slot />
        </span>
      </button>
    </div>
  );
});