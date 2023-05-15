/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  namespace Selenide {
    export interface Element {
      element(
        located:
          | string
          | By
          | {
              script:
                | string
                | ((element: HTMLElement) => HTMLElement | ShadowRoot)
              args?: any[]
            },
        customized?: Partial<Configuration>,
      ): Element
      all(
        located:
          | string
          | By
          | {
              script:
                | string
                | ((element: HTMLElement) => HTMLCollectionOf<HTMLElement>)
              args?: any[]
            },
        customized?: Partial<Configuration>,
      ): Collection
      with(customConfig: Partial<Configuration>): Element
      longPress({ duration }?: { duration: number }): Promise<Element>
      tap: () => Promise<Element>
      /* Skipping typing to eliminate error ts 1062 */
      // then: (
      //   onfulfilled?: ((self: Element) => Element | undefined) | null | undefined,
      //   onrejected?: ((reason: any) => unknown) | null | undefined,
      // ) => Promise<Element | undefined>;
    }
    export interface Collection {
      with(customConfig: Partial<Configuration>): Collection
      getAsCashedArray(): Promise<Element[]>
      elementAt(index: number): Element
      get first(): Element
      get second(): Element
      sliced(start: number, end: number): Collection
      filteredBy(...conditions: ElementCondition[]): Collection
      by(...conditions: ElementCondition[]): Collection
      elementBy(...conditions: ElementCondition[]): Element
      collected(
        searchFunction: (element: Element) => Element | Collection,
      ): Collection
    }
  }
}

export {}
