import "./nameBadge.css";

export default function NameBadge({ name, isOperator }) {
    /*const initials = name
        .split(" ")
        .map((w) => {
            return w[0].toUpperCase();
        })
        .concat();*/

    return (
          <div className={`badge ${isOperator ? "badge--operator" : "badge--visitor"}`}>
      {isOperator ? (
        <img src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-5--v1.png" alt="" />
      ) : (
        <span>{name}</span>
      )}
    </div>
       
    );
}

/*

  <div className={`badge ${isOperator ? "badge--operator" : "badge--visitor"}`}>
          {isOperator &&  (
            <img src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-5--v1.png" alt="" />
          )}
        </div>
*/