export default function Button(props) {
  return (
    <>
      <button onClick={() => props.function()} type={props.type}>
        {props.children}
      </button>
    </>
  );
}
