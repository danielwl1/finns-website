import { useContext, useEffect, useState } from 'react';
import React from 'react';
import { BookPageIndex } from '@/types/BookPageIndex';
import { BookContext } from './Main';
import ZoomSlider from './ZoomSlider';

type DaySliderProps = {
    hover: (entry: BookPageIndex | null) => void;
};

export default function DaySlider({ hover }: DaySliderProps) {
    const { entries, displayed, setDisplayed } = useContext(BookContext)!;
    const [sliderValue, setSliderValue] = useState(displayed);

    useEffect(() => {
        setSliderValue(displayed);
    }, [displayed]);

    const total = entries.data[entries.data.length - 1].getDaysSinceStart() + 1;

    const OFFSET = 0.9;
    const gapToFirst = 1 - OFFSET;

    function indexToSliderOffset(index: BookPageIndex): number {
        let entry;
        if ((entry = index.getEntry())) {
            return gapToFirst + (entry.getDaysSinceStart() * OFFSET) / total;
        } else {
            return 0;
        }
    }

    function sliderOffsetToIndex(offset: number): BookPageIndex {
        if (offset < gapToFirst / 2) {
            return BookPageIndex.homepage(entries);
        }

        return BookPageIndex.entry(
            entries.getClosestEntryByDay(
                (Math.max(gapToFirst, offset) - gapToFirst) *
                    (1 / OFFSET) *
                    total,
            ),
            entries,
        );
    }
    function onStart() {
        hover(sliderValue);
    }

    const handleChange = (value: number) => {
        const index = sliderOffsetToIndex(value);
        if (!index.equals(sliderValue)) {
            setSliderValue(index);
            hover(index);
        }
    };

    const marks = entries.data.map((entry) => {
        return (entry.getDaysSinceStart() / total) * OFFSET + gapToFirst;
    });

    const changeCommitted = (value: number) => {
        setDisplayed(sliderOffsetToIndex(value));
        hover(null);
    };

    return (
        <div className="h-[100px] overflow-x-hidden w-full min-w-0">
            <ZoomSlider
                value={indexToSliderOffset(sliderValue)}
                onChange={handleChange}
                onChangeCommitted={changeCommitted}
                onStart={onStart}
                marks={marks}
                scrollSpeed={0.25}
                slotClasses={{
                    sticky: 'w-[60px]',
                    scroll: 'w-[100px]',
                    rail: 'rail',
                    mark: 'mark',
                    thumb: 'thumb',
                    container: 'mr-[50px] ml-[50px]',
                    zoomedRail: 'w-[3000px]',
                }}
            />
        </div>
    );
}
