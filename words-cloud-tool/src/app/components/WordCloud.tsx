"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
const WordCloud = dynamic(
  () => import("@ant-design/charts").then(({ WordCloud }) => WordCloud),
  { ssr: false }
);

function getDataList(data: any[]) {
  const list: any[] = [];
  data.forEach((d) => {
    list.push({
      word: d.name,
      weight: d.value,
      id: list.length,
    });
  });
  return list;
}
function hoverAction(_item: any, _dimension: any, _evt: any, _start: any) {}

function getRandomColor() {
  const arr = [
    "#5B8FF9",
    "#5AD8A6",
    "#5D7092",
    "#F6BD16",
    "#E8684A",
    "#6DC8EC",
    "#9270CA",
    "#FF9D4D",
    "#269A99",
    "#FF99C3",
  ];
  return arr[Math.floor(Math.random() * (arr.length - 1))];
}

const getConfig = (data: any) => {
  return {
    paddingTop: 40,
    data,
    color: (_word: string, _weight: number) => {
      return getRandomColor();
    },
    layout: { spiral: "rectangular" },
    colorField: "text",
    wordStyle: {
      rotation: [-Math.PI / 2, Math.PI / 2],
      rotateRatio: 0.5,
      rotationSteps: 4,
      fontSize: [10, 60],
      color: (_word: string, _weight: number) => {
        return getRandomColor();
      },
      active: {
        shadowColor: "#333333",
        shadowBlur: 10,
      },
      gridSize: 8,
    },
    shape: "cardioid",
    tooltip: false,
  };
};

const DemoWordCloud2 = () => {
  const [config, setConfig] = useState<any>([]);
  const asyncFetch = () => {
    fetch("/api/word")
      .then((response) => response.json())
      .then((json) => {
        setConfig(getConfig(json));
      });
  };

  useEffect(() => {
    asyncFetch();
  }, []);
  return <WordCloud {...config} />;
};

export default DemoWordCloud2;
