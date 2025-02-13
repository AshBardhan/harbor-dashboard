export default function BadgeList({list}) {
    return (
        <div className="badges">
        {list.map((item, index) => {
            return (<div key={index} className="badge">
                <img src={item} width={16} height={16}/>
            </div>)
        })}
        </div>
    )
  }