import { SubscriptionHookOptions } from "@apollo/react-hooks";
import { OperationVariables } from "apollo-client";
import { DocumentNode } from "graphql";
import { useState } from 'preact/hooks';
import { useSubscription } from '@apollo/react-hooks';

// https://github.com/apollographql/react-apollo/issues/3802

export function useFixedSubscription<TData = any, TVariables = OperationVariables>(subscription: DocumentNode, options?: SubscriptionHookOptions<TData, TVariables>): {
    variables: TVariables | undefined;
    loading: boolean;
    data?: TData | undefined;
    error?: import("apollo-client").ApolloError | undefined;
} {
    const [data, setData] = useState(null);

    const { error, variables } = useSubscription(subscription, {
        ...options,
        onSubscriptionData: opts => { setData(opts.subscriptionData.data); }
    });

    return { loading: data === null && error === undefined, error, data, variables };
}
