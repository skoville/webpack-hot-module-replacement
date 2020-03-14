import { ObjectType, Field } from 'type-graphql';
import "reflect-metadata";

@ObjectType()
export class SkovillePluginState {
    @Field()
    webpackConfigurationName!: string;

    @Field(_type => [SkovillePluginClient])
    clients!: SkovillePluginClient[];

    @Field(_type => [SkovillePluginUpdate])
    updates!: SkovillePluginUpdate[];
}

@ObjectType()
export class SkovillePluginClient {
    @Field()
    clientId!: string;

    @Field()
    currentHash!: string;
}

@ObjectType()
export class SkovillePluginUpdate {
    @Field()
    hash!: string;

    @Field(_type => [CompilerException])
    errors!: CompilerException[];

    @Field(_type => [CompilerException])
    warnings!: CompilerException[];
}

@ObjectType()
export class SourceLocation {
    @Field()
    line!: number;

    @Field()
    column!: number;
}

@ObjectType()
export class CompilerException {
    @Field()
    message!: string;

    @Field()
    fileName!: string;

    @Field(_type => SourceLocation)
    sourceStart!: SourceLocation;

    @Field(_type => SourceLocation)
    sourceEnd!: SourceLocation;
}

@ObjectType()
export class SkovillePluginUpdateContainer {
    @Field(_type => [SkovillePluginUpdate], {nullable: true})
    updatesIfHistoryCompatible?: SkovillePluginUpdate[];
}

@ObjectType()
export class SkovillePluginUpdateResponse {
    @Field(_type => SkovillePluginUpdateContainer, {nullable: true})
    updatesIfWebpackConfigurationNameRegistered?: SkovillePluginUpdateContainer;
}