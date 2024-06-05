/*
  Adds an indexed onboarding_status field to the service_providers table.

  This index is necessary to support the access pattern of displaying onboarded service provider profiles on the List
  of Service Providers Page.
*/

alter table service_providers
add column onboarding_status boolean default false not null;

create index onboarded_service_providers_idx on service_providers (onboarding_status);
