class ChargesController < ApplicationController
  def index
    @payments = Payment.all.order(created_at: :desc)
    @total = Money.new(Payment.sum(:amount))
  end

  def new
  end

  def create
    Stripe.api_key = ENV["STRIPE_SECRET_KEY"]
    token = charge_params[:token]
    amount = charge_params[:amount].to_i * 100
    why = charge_params[:why] == "" ? "no reason" : charge_params[:why]

    begin
      Stripe::Charge.create(
        :source => token,
        :amount      => amount,
        :description => 'PayGu transaction',
        :currency    => 'usd',
        :metadata => { why: why }
      )
      Payment.create(why: why, amount: amount)
      redirect_to charges_path
    rescue Stripe::CardError => e
      flash[:error] = e.message
      redirect_to new_charge_path
    end
  end

  private

  def charge_params
    params.require(:charge).permit(:amount, :token, :why)
  end
end
