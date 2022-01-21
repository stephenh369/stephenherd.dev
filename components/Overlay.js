export default function Overlay (props) {


  return (
    <>
      { props.project === 'project one' ? (
        <div className="absolute z-100 top-0 left-0 bottom-0 right-0 flex flex-col justify-center items-center w-100 h-100 bg-black bg-opacity-50">
          <h1>PROJECT ONE OVERLAY</h1>
        </div>
      ) : props.project === 'project two' ? (
        <div className="absolute z-100 top-0 left-0 bottom-0 right-0 flex flex-col justify-center items-center w-100 h-100 bg-black bg-opacity-50">
          <h1>PROJECT TWO OVERLAY</h1>
        </div> 
      ) : props.project === 'project three' ? (
        <div className="absolute z-100 top-0 left-0 bottom-0 right-0 flex flex-col justify-center items-center w-100 h-100 bg-black bg-opacity-50">
          <h1>PROJECT THREE OVERLAY</h1>
        </div>
      ) : null }
    </>
  )
}