-- DropForeignKey
ALTER TABLE `transaction_products` DROP FOREIGN KEY `transaction_products_transactionId_fkey`;

-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `transactions_clientId_fkey`;

-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `transactions_gatewayId_fkey`;

-- DropIndex
DROP INDEX `transaction_products_transactionId_fkey` ON `transaction_products`;

-- DropIndex
DROP INDEX `transactions_clientId_fkey` ON `transactions`;

-- DropIndex
DROP INDEX `transactions_gatewayId_fkey` ON `transactions`;

-- AlterTable
ALTER TABLE `transactions` ALTER COLUMN `status` DROP DEFAULT,
    MODIFY `cardNumber` VARCHAR(255) NOT NULL,
    MODIFY `cvv` VARCHAR(10) NOT NULL;
