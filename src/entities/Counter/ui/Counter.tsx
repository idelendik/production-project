import { Button } from "@/shared/ui/Button";
import { useDispatch } from "react-redux";
import { counterActions } from "../model/slice/counterSlice";
import { useCounterValue } from "../model/selectors/getCounterValue/getCounterValue";

export const Counter = () => {
    const dispatch = useDispatch();
    const counterValue = useCounterValue();

    const decrement = () => { dispatch(counterActions.decrement()) };
    const increment = () => { dispatch(counterActions.increment()) };

    return (
        <div>
            <h1 data-testid="value-title">{counterValue}</h1>
            <Button data-testid="decrement-btn" onClick={decrement}>-1</Button>
            <Button data-testid="increment-btn" onClick={increment}>+1</Button>
        </div>
    );
};