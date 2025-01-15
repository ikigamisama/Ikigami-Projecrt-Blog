"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";
import { useState } from "react";

const Slider = React.forwardRef<
	React.ElementRef<typeof SliderPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => {
	const [isHovered, setIsHovered] = useState(false);
	return (
		<>
			<SliderPrimitive.Root
				ref={ref}
				className={cn(
					"relative flex w-full touch-none select-none items-center",
					className,
				)}
				{...props}>
				<SliderPrimitive.Track className='relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20'>
					<SliderPrimitive.Range className='absolute h-full bg-primary' />
				</SliderPrimitive.Track>
				<SliderPrimitive.Thumb
					className='relative block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}>
					{isHovered && (
						<div className='absolute -top-8 left-1/2 transform -translate-x-1/2 bg-primary text-white text-sm px-2 py-1 rounded-md shadow-lg'>
							{props.value}
						</div>
					)}
				</SliderPrimitive.Thumb>
			</SliderPrimitive.Root>

			<div className='flex justify-between text-sm text-muted-foreground'>
				<span className='text-lg text-black font-bold'>{props.min}</span>
				<span className='text-lg text-black font-bold'>{props.max}</span>
			</div>
		</>
	);
});

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
