import * as anchor from "@project-serum/anchor";
import assert from "assert";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  Token,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import {
  AccountMeta,
  PublicKey,
  SystemProgram,
  SYSVAR_CLOCK_PUBKEY,
  SYSVAR_RENT_PUBKEY,
  TransactionInstruction,
} from "@solana/web3.js";
import { OptionMarketV2 } from "../../packages/options-ts/src/types";
import { initSetup } from "../../utils/helper";
import { FEE_OWNER_KEY } from "../../packages/options-ts/src/fees";
import { CpiExamples } from "../../target/types/cpi_examples";
import { Program } from "@project-serum/anchor";
import { OptionsTrading } from "../../target/types/options_trading";

describe("cpi_examples initOptionMarket", () => {
  const user = anchor.web3.Keypair.generate();
  const program = anchor.workspace.CpiExamples as Program<CpiExamples>;
  const provider = program.provider;
  const optionsProgram = anchor.workspace
    .OptionsTrading as Program<OptionsTrading>;

  let optionMarket: OptionMarketV2;
  let underlyingToken: Token;
  let quoteToken: Token;
  let optionMarketKey: PublicKey;
  let remainingAccounts: AccountMeta[] = [];
  let instructions: TransactionInstruction[] = [];

  before(async () => {
    await provider.connection.confirmTransaction(
      await provider.connection.requestAirdrop(user.publicKey, 10_000_000_000),
      "confirmed"
    );
    ({
      instructions,
      optionMarket,
      optionMarketKey,
      quoteToken,
      underlyingToken,
      remainingAccounts,
    } = await initSetup(
      provider,
      (provider.wallet as anchor.Wallet).payer,
      user,
      optionsProgram
    ));
  });

  it("should initialize a new option market", async () => {
    try {
      await program.methods
        .initializeOptionMarket(
          optionMarket.underlyingAmountPerContract,
          optionMarket.quoteAmountPerContract,
          optionMarket.expirationUnixTimestamp,
          optionMarket.bumpSeed
        )
        .accounts({
          user: provider.wallet.publicKey,
          optionsTradingProgram: optionsProgram.programId,
          underlyingAssetMint: optionMarket.underlyingAssetMint,
          quoteAssetMint: optionMarket.quoteAssetMint,
          optionMint: optionMarket.optionMint,
          writerTokenMint: optionMarket.writerTokenMint,
          quoteAssetPool: optionMarket.quoteAssetPool,
          underlyingAssetPool: optionMarket.underlyingAssetPool,
          optionMarket: optionMarket.key,
          feeOwner: FEE_OWNER_KEY,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
          systemProgram: SystemProgram.programId,
          clock: SYSVAR_CLOCK_PUBKEY,
        })
        .remainingAccounts(remainingAccounts)
        .postInstructions(instructions).rpc;
    } catch (err) {
      console.error(err);
      throw err;
    }
  });
});
