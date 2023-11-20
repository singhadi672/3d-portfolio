export default function PlainLoader() {
    return (

        <div className="animate-pulse" style={{ zIndex: 25 }}>
            <div class="flex-1 space-y-6 py-1 w-[20rem]">
                <div class="h-2 bg-hero_highlight-dark rounded"></div>
                <div class="space-y-3">
                    <div class="grid grid-cols-3 gap-4">
                        <div class="h-2 bg-hero_highlight-dark rounded col-span-2"></div>
                        <div class="h-2 bg-hero_highlight-dark rounded col-span-1"></div>
                    </div>
                    <div class="h-2 bg-hero_highlight-dark rounded"></div>
                </div>
            </div>
        </div>

    )
}