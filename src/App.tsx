import React, { useState } from "react";
import "./App.css";
import { nPlus, nMinus, nTimes, nDiv } from "./math";
import { useEffect } from "react";

// 哈希表记录输入值和运算符号值
let resultHash = new Map();

const operatorKey: string[] = ["+", "-", "x", "÷"];
let isEqual = false;

export default function Calculator() {
  let [result, setResult] = useState("0");

  const appendOperator = (char: string): void => {
    resultHash.set("key", char);
  };
  //添加到hash表
  const addHash = (char: string): void => {
    let oKey = resultHash.get("key");
    if (!oKey) {
      resultHash.set("addend", char);
      return;
    }
    resultHash.set("summand", char);
  };

  useEffect(() => {
    addHash(result);
  }, [result]);
  const append = (char: string): void => {
    if (result.includes(".") && char === ".") return;
    //初次showValue为0的时候直接赋值不做拼接
    if (result === "0") {
      if (char === ".") {
        setResult(result + char);
        return;
      }
      setResult(char);
      return;
    }

    let oKey = resultHash.get("key");

    if (!oKey && !isEqual) {
      setResult(result + char);
      return;
    }
    const flag = operatorKey.includes(oKey);
    if (flag) {
      let value = resultHash.get("summand") || "";
      setResult((prev) => {
        addHash(value + char);
        return value + char;
      });
      return;
    }
    setResult((prev) => {
      if (prev === char) {
        addHash(char);
      }

      isEqual = false;
      return char;
    });
  };

  // 点击等号
  const calculate = (): void => {
    let addend = resultHash.get("addend");
    let summand = resultHash.get("summand");
    let operatorKey_ = resultHash.get("key");
    let operatorObj: any = {
      "+": () => {
        let result = nPlus(Number(addend), Number(summand));
        console.log("opreate", result, Number(addend), Number(summand));
        setResult(result);
      },
      "-": () => {
        let result = nMinus(Number(addend), Number(summand));
        setResult(result);
      },
      x: () => {
        let result = nTimes(Number(addend), Number(summand));
        setResult(result);
      },
      "÷": () => {
        let result = nDiv(Number(addend), Number(summand));
        setResult(result);
      },
    };
    if (typeof operatorObj?.[operatorKey_] === "function") {
      operatorObj?.[operatorKey_]();
    }
    appendOperator("=");
    resetCalculator();
    isEqual = true;
  };

  const sliceDEL = (): void => {
    let resultArr: string[] = result?.split("");
    resultArr.pop();
    let resultStr: string = resultArr?.join("");
    if (!resultArr?.length) resultStr = "0";
    setResult(resultStr);
  };

  // 计算结果完成后重置计算器
  const resetCalculator = () => {
    resultHash.clear();
    console.log("clear", resultHash);
  };

  //  点击 C
  const clear = (): void => {
    resultHash.clear();
    setResult("0");
  };

  return (
    <div>
      <div className="calculator">
        <div
          className="result"
          style={{
            gridArea: "result",
          }}
        >
          {result}
        </div>
        <div className="content">
          <div className="flex">
            <button onClick={clear}>C</button>
            <button onClick={sliceDEL}>DEL</button>
            <button onClick={() => appendOperator("÷")}>÷</button>
            <button onClick={() => appendOperator("x")}>x</button>
          </div>
          <div className="flex">
            <button onClick={() => append("7")}>7</button>
            <button onClick={() => append("8")}>8</button>
            <button onClick={() => append("9")}>9</button>
            <button onClick={() => appendOperator("-")}>-</button>
          </div>
          <div className="flex">
            <button onClick={() => append("4")}>4</button>
            <button onClick={() => append("5")}>5</button>
            <button onClick={() => append("6")}>6</button>
            <button onClick={() => appendOperator("+")}>+</button>
          </div>
          <div className="flex">
            <div className="left-wrapper">
              <div className="flex">
                <button onClick={() => append("1")}>1</button>
                <button onClick={() => append("2")}>2</button>
                <button onClick={() => append("3")}>3</button>
              </div>
              <div className="flex">
                <button onClick={() => append("0")}>0</button>
                <button onClick={() => append(".")}>.</button>
              </div>
            </div>
            <div className="right-wrapper">
              <button className="right-wrapper-btn" onClick={() => calculate()}>
                =
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
