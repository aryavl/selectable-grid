import { useCallback, useState } from "react";

type SelectableGridProps = {
  rows: number;
  columns: number;
};
interface CustomCSSProps extends React.CSSProperties {
  "--rows": number;
  "--columns": number;
}

const SelectableGrid: React.FC<SelectableGridProps> = ({ rows, columns }) => {
    const [isMouseDown,setIsMouseDown] = useState<boolean>(false)
    const [selectedBoxes,setSelectedBoxes] = useState<number[]>([])

  const gridStyle: CustomCSSProps = {
    "--rows": rows,
    "--columns": columns,
  };

  const handleOnMouseUp = () =>{
    setIsMouseDown(false)
   
  }
  const handleMouseDown = (boxNumber:number) =>{
    setIsMouseDown(true)
    setSelectedBoxes([boxNumber])
  }
  const handleMouseEnter = useCallback((boxNumber:number) =>{
        if(isMouseDown){
            const startBox = selectedBoxes[0]
            const endBox = boxNumber

            const startRow = Math.floor((startBox-1)/columns)
            const endRow = Math.floor((endBox-1)/columns)

            const startCol = (startBox - 1) % columns
            const endCol = (endBox -1)%columns
            
            const minRow = Math.min(startRow,endRow)
            const maxRow = Math.max(startRow,endRow)

            const minCol = Math.min(startCol,endCol)
            const maxCol = Math.max(startCol,endCol)

            const selected = []

            for(let row= minRow; row <=maxRow; row++ ){
                for(let col=minCol; col<=maxCol;col++){
                    selected.push(row * columns + col + 1)
                }
            }
            // console.log(selected);
            setSelectedBoxes(selected)
        }
  },[columns, isMouseDown, selectedBoxes])
 console.log(selectedBoxes);
 
  
  return (
  

    <div className="grid" style={gridStyle} onMouseUp={handleOnMouseUp}>
      {[...Array(rows * columns).keys()].map((_, i) => (
        <div className={`box ${selectedBoxes.includes(i+1)? " selected":""}`} key={i}
        onMouseDown={()=>handleMouseDown(i+1)} 
        onMouseEnter={()=>handleMouseEnter(i+1)}
        >
          {i + 1}
        </div>
      ))}
    </div>
  );
};

export default SelectableGrid;
