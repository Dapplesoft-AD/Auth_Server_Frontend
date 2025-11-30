import { Component } from '@angular/core'

@Component({
    selector: 'app-feature-section',
    template: `
        <div class="bg-surface-0 px-6 md:px-12 lg:px-20 py-20 text-center">
            <div class="flex flex-col gap-6">
                <div class="flex flex-col items-center gap-4">
                    <div class="font-bold text-3xl leading-tight">
                        <span class="text-surface-900 ">One Product, </span>
                        <span class="text-primary-500 dark:text-primary-400">Many Solutions</span>
                    </div>
                    <div class="text-surface-500 dark:text-surface-400 leading-tight">Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna.</div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    @for(item of featuresData; track $index){
                     <div class="w-full rounded-md p-4">
                        <span class="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-surface-0   shadow mx-auto">
                            <i class="{{item.icon}} text-2xl! lg:text-3xl! text-primary-500 dark:text-primary-400"></i>
                        </span>
                        <div class="flex flex-col gap-1">
                            <div class="text-surface-900 text-xl font-medium leading-tight">{{item.title}}</div>
                            <p class="text-surface-500 px-4 lg:px-8 leading-normal">{{item.description}}</p>
                        </div>
                    </div>
                    }
                </div>
            </div>
        </div>
    `,
})
export class FeatureSectionComponent {
    featuresData = [
        {
            id: 1,
            icon: 'pi pi-desktop',
            title: 'Built for Developers',
            description:
                'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        },
        {
            id: 2,
            icon: 'pi pi-lock',
            title: 'End-to-End Encryption',
            description:
                'Risus nec feugiat in fermentum posuere urna nec. Posuere sollicitudin aliquam ultrices sagittis..',
        },
        {
            id: 3,
            icon: 'pi pi-face-smile',
            title: 'Easy to Use',
            description:
                'Ornare suspendisse sed nisi lacus sed viverra tellus. Neque volutpat ac tincidunt vitae semper.',
        },
        {
            id: 4,
            icon: 'pi pi-globe',
            title: 'Fast & Global Support',
            description:
                'Fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus.',
        },
        {
            id: 5,
            icon: 'pi pi-github',
            title: 'Open Source',
            description:
                'Nec tincidunt praesent semper feugiat. Sed adipiscing diam donec adipiscing tristique risus nec feugiat.',
        },
        {
            id: 5,
            icon: 'pi pi-github',
            title: 'Trusted Security',
            description:
                'Mattis rhoncus urna neque viverra justo nec ultrices. Id cursus metus aliquam eleifend.',
        },
    ]
}
