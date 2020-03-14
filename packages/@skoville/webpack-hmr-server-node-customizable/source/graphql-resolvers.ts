import { Resolver, Query } from 'type-graphql';
import { SkovillePluginUpdateResponse, SkovillePluginState } from './type-graphql-types';

@Resolver()
export class ServerResolver {
    constructor(private readonly thing: any) {
        console.log("I see that thing is");
        console.log(JSON.stringify(this.thing));
    }

    @Query(_returns => SkovillePluginUpdateResponse)
    async update() {

    }

    @Query(_returns => SkovillePluginState)
    async state() {

    }
}