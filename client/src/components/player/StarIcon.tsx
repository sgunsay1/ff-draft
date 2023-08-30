import { Show, createSignal } from "solid-js";
import { AiFillStar, AiOutlineStar } from "solid-icons/ai";

const StarIcon = (props: { wishlisted: boolean; onClick: () => void }) => {
  const [wish, setWish] = createSignal(props.wishlisted);
  return (
    <div
      onclick={() => {
        props.onClick();
        setWish(!wish());
      }}
      class="text-xl hover:scale-105"
    >
      <Show when={wish()} fallback={<AiOutlineStar />}>
        <AiFillStar />
      </Show>
    </div>
  );
};

export default StarIcon;
