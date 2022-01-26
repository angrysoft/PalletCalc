import React, { RefObject, SyntheticEvent, useState } from "react";

const CalcForm = () => {
    const quantityRef:RefObject<HTMLInputElement> = React.createRef();
    const inPackRef:RefObject<HTMLInputElement> = React.createRef();
    const inPalletRef:RefObject<HTMLInputElement> = React.createRef();
    const [pallets, setPallets] = useState(0);
    const [rest, setRest] = useState(0);
    const [restFromPack, setRestInPack] = useState(0);

    const calc = (ev:SyntheticEvent) => {
        let quantity  = parseInt(quantityRef.current?.value || "0");
        let inPack  = parseInt(inPackRef.current?.value || "0");
        let inPallet  = parseInt(inPalletRef.current?.value || "0");
        if (isNaN(quantity) || isNaN(inPack) || isNaN(inPallet)) {
            return;
        }
        
        checkMissingInPack(quantity, inPack);
        if (inPallet === 0)
            return;
        const quantityPallets = Math.round(( quantity / inPack ) / inPallet);
        const rest = Math.round(( quantity / inPack ) % inPallet);
        setPallets(quantityPallets);
        setRest(rest);
    }

    const handleFocus = (event : SyntheticEvent) => {
        const el = event.target as HTMLInputElement;
        el.select();
    };

    const checkMissingInPack = (quantity:number, inPack:number) => {
        if (quantity === 0 || inPack === 0 )
            return;
        let rest = quantity % inPack
        if (rest === 0) {
            setRestInPack(0);
        } else {
            setRestInPack(inPack - rest);
        }
    }

    const changeFocus = (ev:React.KeyboardEvent<HTMLFormElement>) => {
        if (ev.key !== 'Enter')
            return;
        const form = ev.target as HTMLFormElement;
        const inputs = [quantityRef, inPackRef, inPalletRef];
        const index = form.tabIndex === 2 ? 0 : form.tabIndex + 1
        let next = inputs[index];
        next.current?.focus();
        
    }

    return (
        <form className="calculator" onKeyPress={(ev) => {changeFocus(ev)}}>
            <div className="order form-item">
                <label htmlFor="quantity">Ilość zamówiona w szt</label>
                <input type="number" name="quantity" id="quantity" ref={quantityRef} onChange={calc} onFocus={handleFocus} defaultValue={"0"} tabIndex={0} autoFocus/>
                <span>szt</span>
            </div>
            <div className="pack form-item">
                <label htmlFor="in-pack">Ilość w opakowaniu</label>
                <input type="number" name="in-pack" id="in-pack" ref={inPackRef} onChange={calc} onFocus={handleFocus} defaultValue={"0"} tabIndex={1} />
                <span>szt</span>
            </div>
            <div className="pallet form-item">
                <label htmlFor="in-pallet">Ilość opakowań na palecie</label>
                <input type="number" name="in-pallet" id="in-pallet" ref={inPalletRef} onChange={calc} onFocus={handleFocus} defaultValue={"0"} tabIndex={2} />
                <span>szt</span>

            </div>
            <div className="check-pack form-item">
                <label htmlFor="missing-in-pack">Brakujących opakowań do pełnej paczki</label>
                <span>{restFromPack}</span>
                <span>szt</span>
            </div>
            <div className="pallet form-item">
                <label htmlFor="in-pallet">Ilość palet</label>
                <span>{pallets}</span>
                <span>szt</span>
            </div>
            <div className="pallet form-item">
                <label htmlFor="in-pallet">Reszta opakowań </label>
                <span>{rest}</span>
                <span>szt</span>
            </div>
        </form>
    );
}

export default CalcForm