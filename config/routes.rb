Rails.application.routes.draw do
  root to: "charges#new"
  resources :charges
end
